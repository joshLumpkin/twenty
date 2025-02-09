import { ID, Field, ObjectType } from '@nestjs/graphql';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IDField } from '@ptc-org/nestjs-query-graphql';

import { RefreshToken } from 'src/core/refresh-token/refresh-token.entity';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { UserWorkspaceMember } from 'src/core/user/dtos/workspace-member.dto';

@Entity({ name: 'user', schema: 'core' })
@ObjectType('User')
export class User {
  @IDField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: true })
  firstName: string;

  @Field()
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ default: false })
  emailVerified: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  disabled: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passwordHash: string;

  @Field()
  @Column({ default: false })
  canImpersonate: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deletedAt: Date;

  @Field(() => Workspace, { nullable: false })
  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  defaultWorkspace: Workspace;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Field(() => UserWorkspaceMember, { nullable: false })
  workspaceMember: UserWorkspaceMember;
}
