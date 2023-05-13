import { useField } from 'formik';
import React, { FC, ReactNode, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LabelledCheckbox from './LabelledCheckbox';

interface CheckboxFieldProps {
  fieldName: string;
  name?: string;
  onPress?: (checked: boolean) => void;
  nameComponent?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const CheckboxField: FC<CheckboxFieldProps> = ({ fieldName, name, containerStyle, nameComponent, ...rest }) => {
  const [{ checked }, , { setValue }] = useField({
    name: fieldName,
    type: 'checkbox',
  });

  const onPress = useCallback(
    (nextChecked: boolean) => {
      setValue(nextChecked);
      // Expose change event to parent to allow for submit-on-change functionality
      rest.onPress?.(nextChecked);
    },
    [setValue, rest],
  );

  return (
    <LabelledCheckbox
      onPress={onPress}
      checked={checked ?? false}
      name={name}
      containerStyle={containerStyle}
      nameComponent={nameComponent}
    />
  );
};

export default CheckboxField;
