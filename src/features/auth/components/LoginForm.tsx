import AppText from '@components/AppText';
import AppTextField from '@components/AppTextField';
import BlockButton from '@components/BlockButton';
import theme from '@utils/theme';
import { Formik, FormikProps } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginFormFields, LoginFormValues, loginValidationSchema } from '../formik/LoginFormValues';

const INITIAL_VALUES: LoginFormValues = {
  [LoginFormFields.EMAIL]: '',
  [LoginFormFields.PASSWORD]: '',
};

const LoginForm = () => {
  const formRef = useRef<FormikProps<LoginFormValues>>(null);

  const [securePassword, setSecurePassword] = useState(true);

  const onSubmit = (values: LoginFormValues) => {
    console.debug({ values });
  };

  const securePasswordToggle = useCallback(() => {
    setSecurePassword(!securePassword);
  }, [securePassword]);

  return (
    <View style={styles.container}>
      <Formik<LoginFormValues>
        innerRef={formRef}
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
        validateOnChange
        validateOnMount>
        {({ isValid, submitForm, isSubmitting }: FormikProps<LoginFormValues>) => {
          return (
            <View>
              <AppText style={styles.title}>Iniciar sesión</AppText>

              <AppTextField
                title='Correo electrónico'
                titleStyle={styles.label}
                fieldName={LoginFormFields.EMAIL}
                style={styles.input}
                keyboardType='email-address'
                placeholderTextColor={theme.colors.neutral50}
                placeholder='correo@coquimate.com.co'
                inputContainerStyle={styles.inputContainer}
                highlightOnFocus
              />

              <View>
                <AppTextField
                  title='Contraseña'
                  titleStyle={styles.label}
                  fieldName={LoginFormFields.PASSWORD}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholderTextColor={theme.colors.neutral50}
                  placeholder='Ingrese contraseña'
                  inputContainerStyle={styles.inputContainer}
                  highlightOnFocus
                />
              </View>

              <BlockButton
                text={'Ingresar'}
                onPress={submitForm}
                loading={isSubmitting}
                disabled={!isValid}
                containerStyle={styles.buttonContainer}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.white}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
  container: {
    width: '100%',
    maxWidth: 500,
  },
  input: {
    fontFamily: theme.fonts.poppins400,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: theme.colors.neutral20,
  },
  label: {
    color: theme.colors.neutral70,
  },
  title: {
    fontFamily: theme.fonts.poppins700,
    fontSize: 28,
    color: theme.colors.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default LoginForm;
