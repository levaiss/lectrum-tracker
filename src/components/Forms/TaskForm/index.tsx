// Core
import { FC, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import uk from 'date-fns/locale/uk';

// Components
import DatePicker, { registerLocale } from 'react-datepicker';
import { UiInput } from '../../Ui/UiInput';

// Store
import { getTags } from '../../../store/taskSlice';

// Instruments
import { TaskFormSchema } from './config';
import { TaskRequestData } from '../../../types/Api';
import { TagModel, TaskModel } from '../../../types/TaskModel';

registerLocale('uk', uk);

interface TaskFormProps {
    activeTask: TaskModel | null,
    defaultValues: TaskRequestData,
    handlerOnFormSubmit:
    (credentials: TaskRequestData) => any
    handlerOnRemoveTask: () => any
    handlerOnHideForm: () => any
}

export const TaskForm: FC<TaskFormProps> = ({
    activeTask,
    defaultValues,
    handlerOnFormSubmit,
    handlerOnRemoveTask,
    handlerOnHideForm,
}) => {
    const tags: TagModel[] = useSelector(getTags);
    const {
        handleSubmit,
        formState,
        control,
        register,
        setValue,
        reset,
    } = useForm({
        mode:     'onChange',
        resolver: yupResolver(TaskFormSchema),
        defaultValues,
    });
    const isFormEdited: boolean = formState.isDirty;
    const submitForm = handleSubmit((body) => {
        return handlerOnFormSubmit(body);
    });
    const handlerCompleteTask = () => {
        if (defaultValues.completed) {
            return;
        }

        handlerOnFormSubmit({
            ...defaultValues,
            completed: true,
        });
    };
    const getTaskStatusTemplate = useCallback(() => {
        if (!activeTask) {
            return;
        }

        const isOverdue: boolean
            = new Date(activeTask.deadline).getTime() < Date.now();

        return (
            <>
                {
                    isOverdue && !activeTask.completed ? (
                        <button
                            type = 'button'
                            className = 'button-complete-task overdue'>
                            Просрочено
                        </button>
                    ) : (
                        <button
                            type = 'button'
                            className = { activeTask.completed ? 'button-complete-task completed' : 'button-complete-task' }
                            onClick = { handlerCompleteTask }>
                            { activeTask.completed ? 'Завершено' : 'Завершити' }
                        </button>
                    )
                }
            </>
        );
    }, [activeTask]);

    useEffect(() => {
        for (const [key, value] of Object.entries(defaultValues)) {
            // @ts-ignore
            setValue(key, value);
        }
    }, [defaultValues]);

    return (
        <form
            onSubmit = { submitForm }>
            <div className = 'head'>
                { getTaskStatusTemplate() }
                <button
                    type = 'button'
                    className = 'button-close-task'
                    onClick = { handlerOnHideForm }>
                    Закрити
                </button>
            </div>
            <div className = 'content'>
                <div className = 'title'>
                    <UiInput
                        label = 'Задачі'
                        placeholder = 'Пройти інтенсив по React + Redux + TS + Mobx'
                        name = 'title'
                        autoFocus
                        error = { formState.errors.title }
                        register = { register('title') } />
                </div>
                <div className = 'deadline'>
                    <div className = 'label'>Дедлайн</div>
                    <Controller
                        control = { control }
                        render = { ({ field: { onChange, value } }) => (
                            <DatePicker
                                locale = 'uk'
                                dateFormat = 'dd LLL yyyy'
                                minDate = { new Date() }
                                selected = { new Date(value) }
                                onChange = { onChange } />
                        ) }
                        name = 'deadline' />
                </div>
                <div className = 'description'>
                    <UiInput
                        type = 'textarea'
                        label = 'Опис'
                        placeholder = 'Після вивчення всіх технологій, завершити роботу над проектами та знайти нову роботу'
                        name = 'description'
                        error = { formState.errors.description }
                        register = { register('description') } />
                </div>
                <div className = 'tags'>
                    <Controller
                        control = { control }
                        render = { ({ field: { onChange, value } }) => (
                            <>
                                { Array.isArray(tags) && tags.map((tag) => (
                                    <span
                                        key = { tag.id }
                                        onClick = { () => { onChange(tag.id); } }
                                        className = { tag.id === value ? 'tag selected' : 'tag ' }
                                        style = { {
                                            color:           tag.color,
                                            backgroundColor: tag.bg,
                                        } }>
                                        { tag.name }
                                    </span>
                                )) }
                            </>
                        ) }
                        name = 'tag' />
                </div>
                <div className = 'form-controls'>
                    <button
                        type = 'button'
                        className = 'button-reset-task'
                        onClick = { () => reset(defaultValues) }
                        disabled = { !isFormEdited }>
                        Скинути
                    </button>
                    <button
                        type = 'submit'
                        className = 'button-save-task'
                        disabled = { !isFormEdited }>
                        Зберегти
                    </button>
                    { activeTask && (
                        <button
                            type = 'button'
                            className = 'button-remove-task'
                            onClick = { handlerOnRemoveTask }>
                            Видалити
                        </button>
                    ) }
                </div>
            </div>
        </form>
    );
};
