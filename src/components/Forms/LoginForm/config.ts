/* Core */
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { loginRequestData } from '../../../types/Api';

// Instruments
import { ERROR_MESSAGES } from '../error-messages';

export const LoginFormSchema: SchemaOf<loginRequestData> = yup.object().shape({
    email:    yup.string().required(ERROR_MESSAGES.required).email(ERROR_MESSAGES.email),
    password: yup.string().required(ERROR_MESSAGES.required).min(6, ERROR_MESSAGES.password),
});
