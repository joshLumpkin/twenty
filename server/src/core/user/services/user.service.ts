import { InjectRepository } from '@nestjs/typeorm';

import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';

import { assert } from 'src/utils/assert';
import { User } from 'src/core/user/user.entity';
import { UserWorkspaceMember } from 'src/core/user/dtos/workspace-member.dto';
import { DataSourceService } from 'src/metadata/data-source/data-source.service';
import { TypeORMService } from 'src/database/typeorm/typeorm.service';

export class UserService extends TypeOrmQueryService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSourceService: DataSourceService,
    private readonly typeORMService: TypeORMService,
  ) {
    super(userRepository);
  }

  async loadWorkspaceMember(user: User) {
    const dataSourceMetadata =
      await this.dataSourceService.getLastDataSourceMetadataFromWorkspaceIdOrFail(
        user.defaultWorkspace.id,
      );

    const workspaceDataSource = await this.typeORMService.connectToDataSource(
      dataSourceMetadata,
    );

    const workspaceMembers = await workspaceDataSource?.query(
      `SELECT * FROM ${dataSourceMetadata.schema}."workspaceMember" WHERE "userId" = '${user.id}'`,
    );

    assert(workspaceMembers.length === 1, 'WorkspaceMember not found');

    const userWorkspaceMember = new UserWorkspaceMember();

    userWorkspaceMember.id = workspaceMembers[0].id;
    userWorkspaceMember.colorScheme = workspaceMembers[0].colorScheme;
    userWorkspaceMember.locale = workspaceMembers[0].locale;
    userWorkspaceMember.allowImpersonation =
      workspaceMembers[0].allowImpersonation;
    userWorkspaceMember.avatarUrl = workspaceMembers[0].avatarUrl;
    userWorkspaceMember.name = {
      firstName: workspaceMembers[0].nameFirstName,
      lastName: workspaceMembers[0].nameLastName,
    };

    return userWorkspaceMember;
  }

  async createWorkspaceMember(user: User, avatarUrl?: string) {
    const dataSourceMetadata =
      await this.dataSourceService.getLastDataSourceMetadataFromWorkspaceIdOrFail(
        user.defaultWorkspace.id,
      );

    const workspaceDataSource = await this.typeORMService.connectToDataSource(
      dataSourceMetadata,
    );

    await workspaceDataSource?.query(
      `INSERT INTO ${dataSourceMetadata.schema}."workspaceMember"
      ("nameFirstName", "nameLastName", "colorScheme", "userId", "allowImpersonation", "avatarUrl")
      VALUES ('${user.firstName}', '${user.lastName}', 'Light', '${
        user.id
      }', true, '${avatarUrl ?? ''}')`,
    );
  }

  async deleteUser({
    workspaceId: _workspaceId,
    userId,
  }: {
    workspaceId: string;
    userId: string;
  }) {
    const user = await this.userRepository.findBy({ id: userId });
    assert(user, 'User not found');

    return user;
  }
}
