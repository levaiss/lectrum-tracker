/* Core */
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { TaskRequestData } from '../../../types/Api';

// Instruments
import { ERROR_MESSAGES } from '../error-messages';

export const TaskFormSchema: SchemaOf<TaskRequestData> = yup.object().shape({
    completed:   yup.boolean().required(ERROR_MESSAGES.required),
    title:       yup.string().required(ERROR_MESSAGES.required).min(3, ERROR_MESSAGES.min),
    description: yup.string().required(ERROR_MESSAGES.required).min(3, ERROR_MESSAGES.min),
    deadline:    yup.string().required(ERROR_MESSAGES.required),
    tag:         yup.string().required(ERROR_MESSAGES.required),
});
