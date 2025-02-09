import { DataSource } from 'typeorm';

import { SeedObjectMetadataIds } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';
import { SeedWorkspaceId } from 'src/database/typeorm-seeds/core/workspaces';

const fieldMetadataTableName = 'fieldMetadata';

export enum SeedWorkspaceMemberFieldMetadataIds {
  Id = '20202020-678e-4702-a535-2549ef07f1ca',
  CreatedAt = '20202020-1cbf-4b32-8c33-fbfedcd9afa8',
  UpdatedAt = '20202020-1ba3-4c24-b2cd-b0789633e8d4',

  Name = '20202020-8c37-4163-ba06-1dada334ce3e',
  AvatarUrl = '20202020-7ba6-40d5-934b-17146183a212',
  Locale = '20202020-10f6-4df9-8d6f-a760b65bd800',
  ColorScheme = '20202020-83f2-4c5f-96b0-0c51ecc160e3',
  AllowImpersonation = '20202020-bb19-44a1-8156-8866f87a5f42',
  UserId = '20202020-f2c1-4ca1-9ca5-7b9d5cc87eb0',
  AuthoredActivities = '20202020-37a0-4db4-9c9f-fd3e3f4e47fc',
  AssignedActivities = '20202020-ac05-44b9-9526-764dd5ce14e2',
  AuthoredAttachments = '20202020-7e0c-4dc4-be49-37de4396349e',
  Favorites = '20202020-5ecb-405b-8712-171bb8916b96',
  Settings = '20202020-50ed-46ed-8198-65e237b83eb9',
  AccountOwnerForCompanies = '20202020-41bb-4c17-8979-40fa915df9e1',
  AuthoredComments = '20202020-7238-4e2a-9ccf-d2c8f604933a',
}

export const seedWorkspaceMemberFieldMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${fieldMetadataTableName}`, [
      'id',
      'objectMetadataId',
      'isCustom',
      'workspaceId',
      'isActive',
      'type',
      'name',
      'label',
      'targetColumnMap',
      'description',
      'icon',
      'isNullable',
      'isSystem',
      'defaultValue',
    ])
    .orIgnore()
    .values([
      // Default fields
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Id,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.UUID,
        name: 'id',
        label: 'Id',
        targetColumnMap: {
          value: 'id',
        },
        description: undefined,
        icon: undefined,
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'uuid' },
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.CreatedAt,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE,
        name: 'createdAt',
        label: 'Creation date',
        targetColumnMap: {
          value: 'createdAt',
        },
        description: undefined,
        icon: 'IconCalendar',
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'now' },
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.UpdatedAt,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE,
        name: 'updatedAt',
        label: 'Update date',
        targetColumnMap: {
          value: 'updatedAt',
        },
        description: undefined,
        icon: 'IconCalendar',
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'now' },
      },
      // Scalar fields
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Name,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.FULL_NAME,
        name: 'name',
        label: 'Name',
        targetColumnMap: {
          firstName: 'nameFirstName',
          lastName: 'nameLastName',
        },
        description: 'Workspace member name',
        icon: 'IconCircleUser',
        isNullable: false,
        isSystem: false,
        defaultValue: { firstName: '', lastName: '' },
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AvatarUrl,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'avatarUrl',
        label: 'Avatar Url',
        targetColumnMap: {
          value: 'avatarUrl',
        },
        description: 'Workspace member avatar',
        icon: 'IconFileUpload',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.UserId,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.UUID,
        name: 'userId',
        label: 'User Id',
        targetColumnMap: {
          value: 'userId',
        },
        description: 'Associated User Id',
        icon: 'IconCircleUsers',
        isNullable: false,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AllowImpersonation,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.BOOLEAN,
        name: 'allowImpersonation',
        label: 'Admin Access',
        targetColumnMap: {
          value: 'allowImpersonation',
        },
        description: 'Allow Admin Access',
        icon: 'IconEye',
        isNullable: false,
        isSystem: false,
        defaultValue: { value: false },
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.ColorScheme,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.TEXT,
        name: 'colorScheme',
        label: 'Color Scheme',
        targetColumnMap: {
          value: 'colorScheme',
        },
        description: 'Preferred color scheme',
        icon: 'IconColorSwatch',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Locale,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.TEXT,
        name: 'locale',
        label: 'Language',
        targetColumnMap: {
          value: 'locale',
        },
        description: 'Preferred language',
        icon: 'IconLanguage',
        isNullable: false,
        isSystem: false,
        defaultValue: { value: 'fr' },
      },

      // Relationships
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredActivities,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'authoredActivities',
        label: 'Authored activities',
        targetColumnMap: {},
        description: 'Activities created by the workspace member',
        icon: 'IconCheckbox',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AssignedActivities,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'assignedActivities',
        label: 'Assigned activities',
        targetColumnMap: {},
        description: 'Activities assigned to the workspace member',
        icon: 'IconCheckbox',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Favorites,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'favorites',
        label: 'Favorites',
        targetColumnMap: {},
        description: 'Favorites linked to the workspace member',
        icon: 'IconHeart',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AccountOwnerForCompanies,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'accountOwnerForCompanies',
        label: 'Account Owner For Companies',
        targetColumnMap: {},
        description: 'Account owner for companies',
        icon: 'IconBriefcase',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredAttachments,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'authoredAttachments',
        label: 'Authored attachments',
        targetColumnMap: {},
        description: 'Attachments created by the workspace member',
        icon: 'IconFileImport',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredComments,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'authoredComments',
        label: 'Authored comments',
        targetColumnMap: {},
        description: 'Authored comments',
        icon: 'IconComment',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
    ])
    .execute();
};
