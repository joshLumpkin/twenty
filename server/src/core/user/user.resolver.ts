import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import crypto from 'crypto';

import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { SupportDriver } from 'src/integrations/environment/interfaces/support.interface';
import { FileFolder } from 'src/core/file/interfaces/file-folder.interface';

import { AuthUser } from 'src/decorators/auth-user.decorator';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { streamToBuffer } from 'src/utils/stream-to-buffer';
import { FileUploadService } from 'src/core/file/services/file-upload.service';
import { AuthWorkspace } from 'src/decorators/auth-workspace.decorator';
import { assert } from 'src/utils/assert';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { User } from 'src/core/user/user.entity';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { UserWorkspaceMember } from 'src/core/user/dtos/workspace-member.dto';

import { UserService } from './services/user.service';

const getHMACKey = (email?: string, key?: string | null) => {
  if (!email || !key) return null;

  const hmac = crypto.createHmac('sha256', key);
  return hmac.update(email).digest('hex');
};

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly environmentService: EnvironmentService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Query(() => User)
  async currentUser(@AuthUser() { id }: User) {
    const user = await this.userService.findById(id, {
      relations: [{ name: 'defaultWorkspace', query: {} }],
    });
    assert(user, 'User not found');
    return user;
  }

  @ResolveField(() => UserWorkspaceMember, {
    nullable: false,
  })
  async workspaceMember(@Parent() user: User): Promise<UserWorkspaceMember> {
    return this.userService.loadWorkspaceMember(user);
  }

  @ResolveField(() => String, {
    nullable: true,
  })
  supportUserHash(@Parent() parent: User): string | null {
    if (this.environmentService.getSupportDriver() !== SupportDriver.Front) {
      return null;
    }
    const key = this.environmentService.getSupportFrontHMACKey();
    return getHMACKey(parent.email, key);
  }

  @Mutation(() => String)
  async uploadProfilePicture(
    @AuthUser() { id }: User,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<string> {
    if (!id) {
      throw new Error('User not found');
    }

    const stream = createReadStream();
    const buffer = await streamToBuffer(stream);
    const fileFolder = FileFolder.ProfilePicture;

    const { paths } = await this.fileUploadService.uploadImage({
      file: buffer,
      filename,
      mimeType: mimetype,
      fileFolder,
    });

    return paths[0];
  }

  @Mutation(() => User)
  async deleteUser(
    @AuthUser() { id: userId }: User,
    @AuthWorkspace() { id: workspaceId }: Workspace,
  ) {
    return this.userService.deleteUser({ userId, workspaceId });
  }
}
