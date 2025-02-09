import { useEffect } from 'react';
import styled from '@emotion/styled';

import { EntityForSelect } from '@/ui/input/relation-picker/types/EntityForSelect';
import { RelationPicker } from '@/ui/object/field/meta-types/input/components/internal/RelationPicker';

import { usePersistField } from '../../../hooks/usePersistField';
import { useRelationField } from '../../hooks/useRelationField';

import { FieldInputEvent } from './DateFieldInput';

const StyledRelationPickerContainer = styled.div`
  left: -1px;
  position: absolute;
  top: -1px;
`;

export type RelationFieldInputProps = {
  onSubmit?: FieldInputEvent;
  onCancel?: () => void;
};

export const RelationFieldInput = ({
  onSubmit,
  onCancel,
}: RelationFieldInputProps) => {
  const { fieldDefinition, initialValue, initialSearchValue } =
    useRelationField();

  const persistField = usePersistField();

  const handleSubmit = (newEntity: EntityForSelect | null) => {
    onSubmit?.(() => persistField(newEntity?.record ?? null));
  };

  useEffect(() => {}, [initialSearchValue]);

  return (
    <StyledRelationPickerContainer>
      <RelationPicker
        fieldDefinition={fieldDefinition}
        recordId={initialValue?.id ?? ''}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        initialSearchFilter={initialSearchValue}
      />
      {/* {fieldDefinition.metadata.fieldName === 'person' ? (
        <PeoplePicker
          personId={initialValue?.id ?? ''}
          companyId={initialValue?.companyId ?? ''}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          initialSearchFilter={initialSearchValue}
        />
      ) : fieldDefinition.metadata.fieldName === 'company' ? (
        <CompanyPicker
          companyId={initialValue?.id ?? ''}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          initialSearchFilter={initialSearchValue}
        />
      ) : null} */}
    </StyledRelationPickerContainer>
  );
};
