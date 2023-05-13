import { useField, useFormikContext } from 'formik';
import React, { FC, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import AppFieldContainer from './AppFieldContainer';
import AppTextInput, { AppTextInputProps } from './AppTextInput';

export interface AppTextFieldProps extends AppTextInputProps {
  title?: string;
  fieldName: string;
  visible?: boolean;
  maxLength?: number;
  placeholder: string;
  showErrorAfterTouch?: boolean;
  showErrorAfterFormSubmit?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  fieldContainerStyle?: StyleProp<ViewStyle>;
}

const AppTextField: FC<AppTextFieldProps> = (props) => {
  const {
    fieldName,
    title,
    showErrorAfterTouch = true,
    showErrorAfterFormSubmit = true,
    fieldContainerStyle,
    containerStyle,
    inputContainerStyle,
    ...rest
  } = props;

  const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string>(fieldName);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  const { submitCount } = useFormikContext();

  const showError = (showErrorAfterFormSubmit && submitCount > 0) || (showErrorAfterTouch && touched);

  return (
    <AppFieldContainer
      title={title}
      showError={showError}
      error={error}
      containerStyle={containerStyle}
      fieldContainerStyle={fieldContainerStyle}>
      <AppTextInput
        value={value}
        onChangeText={setValue}
        onBlur={onBlur}
        containerStyle={inputContainerStyle}
        {...rest}
      />
    </AppFieldContainer>
  );
};

export default AppTextField;
