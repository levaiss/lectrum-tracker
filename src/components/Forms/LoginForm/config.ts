/* Core */
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { LoginRequestData } from '../../../types/Api';

// Instruments
import { ERROR_MESSAGES } from '../error-messages';

export const LoginFormSchema: SchemaOf<LoginRequestData> = yup.object().shape({
    email:    yup.string().required(ERROR_MESSAGES.required).email(ERROR_MESSAGES.email),
    password: yup.string().required(ERROR_MESSAGES.required).min(8, ERROR_MESSAGES.min),
});
