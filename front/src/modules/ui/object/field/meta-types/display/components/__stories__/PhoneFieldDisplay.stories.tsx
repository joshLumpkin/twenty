import { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import { ComponentDecorator } from '~/testing/decorators/ComponentDecorator';

import { FieldContext } from '../../../../contexts/FieldContext';
import { usePhoneField } from '../../../hooks/usePhoneField';
import { PhoneFieldDisplay } from '../PhoneFieldDisplay';

const PhoneFieldValueSetterEffect = ({ value }: { value: string }) => {
  const { setFieldValue } = usePhoneField();

  useEffect(() => {
    setFieldValue(value);
  }, [setFieldValue, value]);

  return null;
};

const meta: Meta = {
  title: 'UI/Data/Field/Display/PhoneFieldDisplay',
  decorators: [
    (Story, { args }) => (
      <FieldContext.Provider
        value={{
          entityId: '',
          isMainIdentifier: false,
          fieldDefinition: {
            fieldMetadataId: 'phone',
            label: 'Phone',
            type: 'PHONE',
            iconName: 'IconPhone',
            metadata: {
              fieldName: 'Phone',
              placeHolder: 'Phone',
            },
          },
          hotkeyScope: 'hotkey-scope',
          useUpdateEntityMutation: () => [() => undefined, undefined],
        }}
      >
        <MemoryRouter>
          <PhoneFieldValueSetterEffect value={args.value} />
          <Story />
        </MemoryRouter>
      </FieldContext.Provider>
    ),
    ComponentDecorator,
  ],
  component: PhoneFieldDisplay,
  args: {
    value: '362763872687362',
  },
};

export default meta;

type Story = StoryObj<typeof PhoneFieldDisplay>;

export const Default: Story = {};

export const Elipsis: Story = {
  parameters: {
    container: { width: 50 },
  },
};
