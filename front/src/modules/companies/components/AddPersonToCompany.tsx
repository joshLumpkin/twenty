import { useState } from 'react';
import styled from '@emotion/styled';
import { flip, offset, useFloating } from '@floating-ui/react';
import { v4 } from 'uuid';

import { IconPlus } from '@/ui/display/icon';
import { LightIconButton } from '@/ui/input/button/components/LightIconButton';
import { RelationPickerHotkeyScope } from '@/ui/input/relation-picker/types/RelationPickerHotkeyScope';
import { DoubleTextInput } from '@/ui/object/field/meta-types/input/components/internal/DoubleTextInput';
import { FieldDoubleText } from '@/ui/object/field/types/FieldDoubleText';
import { usePreviousHotkeyScope } from '@/ui/utilities/hotkey/hooks/usePreviousHotkeyScope';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';

const StyledContainer = styled.div`
  position: static;
`;

const StyledInputContainer = styled.div`
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.boxShadow.strong};
  display: flex;
  gap: ${({ theme }) => theme.spacing(0.5)};
  width: ${({ theme }) => theme.spacing(62.5)};
  & input,
  div {
    background-color: ${({ theme }) => theme.background.primary};
    width: 100%;
  }
  div {
    border-radius: ${({ theme }) => theme.spacing(1)};
    overflow: hidden;
  }
  input {
    display: flex;
    flex-grow: 1;
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const AddPersonToCompany = ({
  companyId,
  peopleIds,
}: {
  companyId: string;
  peopleIds?: string[];
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreationDropdownOpen, setIsCreationDropdownOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isDropdownOpen,
    placement: 'right-start',
    middleware: [flip(), offset({ mainAxis: 30, crossAxis: 0 })],
  });

  const handleEscape = () => {
    if (isCreationDropdownOpen) setIsCreationDropdownOpen(false);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const {
    setHotkeyScopeAndMemorizePreviousScope,
    goBackToPreviousHotkeyScope,
  } = usePreviousHotkeyScope();

  const handlePersonSelected =
    (companyId: string) => async (newPerson: any | null) => {
      if (newPerson) {
        // await updatePerson({
        //   variables: {
        //     where: {
        //       id: newPerson.id,
        //     },
        //     data: {
        //       company: { connect: { id: companyId } },
        //     },
        //   },
        //   refetchQueries: [getOperationName(GET_PEOPLE) ?? ''],
        // });
        handleClosePicker();
      }
    };

  const handleClosePicker = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      goBackToPreviousHotkeyScope();
    }
  };

  const handleOpenPicker = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setHotkeyScopeAndMemorizePreviousScope(
        RelationPickerHotkeyScope.RelationPicker,
      );
    }
  };

  const handleInputKeyDown = async ({
    firstValue,
    secondValue,
  }: FieldDoubleText) => {
    if (!firstValue && !secondValue) return;
    const newPersonId = v4();
    // await insertOnePerson({
    //   variables: {
    //     data: {
    //       company: { connect: { id: companyId } },
    //       id: newPersonId,
    //       firstName: firstValue,
    //       lastName: secondValue,
    //     },
    //   },
    //   refetchQueries: [getOperationName(GET_PEOPLE) ?? ''],
    // });
    setIsCreationDropdownOpen(false);
  };

  return (
    <RecoilScope>
      <StyledContainer ref={refs.setReference}>
        <LightIconButton
          Icon={IconPlus}
          onClick={handleOpenPicker}
          size="small"
          accent="tertiary"
        />

        {isDropdownOpen && (
          <div ref={refs.setFloating} style={floatingStyles}>
            {isCreationDropdownOpen ? (
              <StyledInputContainer>
                <DoubleTextInput
                  firstValue=""
                  secondValue=""
                  firstValuePlaceholder="First Name"
                  secondValuePlaceholder="Last Name"
                  onClickOutside={handleEscape}
                  onEnter={handleInputKeyDown}
                  onEscape={handleEscape}
                  hotkeyScope={RelationPickerHotkeyScope.RelationPicker}
                />
              </StyledInputContainer>
            ) : (
              <>todo</>
              // <PeoplePicker
              //   personId={''}
              //   onSubmit={handlePersonSelected(companyId)}
              //   onCancel={handleClosePicker}
              //   onCreate={() => setIsCreationDropdownOpen(true)}
              //   excludePersonIds={peopleIds}
              // />
            )}
          </div>
        )}
      </StyledContainer>
    </RecoilScope>
  );
};
