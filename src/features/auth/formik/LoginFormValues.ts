import * as Yup from 'yup';

export enum LoginFormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface LoginFormValues {
  [LoginFormFields.EMAIL]: string;
  [LoginFormFields.PASSWORD]: string;
}

export const loginValidationSchema = Yup.object({
  [LoginFormFields.EMAIL]: Yup.string()
    .email('Correo electrónico es inválido.')
    .required('Correo electrónico es obligatorio.'),
  [LoginFormFields.PASSWORD]: Yup.string().required('Contraseña es obligatoria'),
});
