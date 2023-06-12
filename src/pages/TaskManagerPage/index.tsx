// Core
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskRequestData } from '../../types/Api';
import { TagModel, TaskModel } from '../../types/TaskModel';

// Store
import { useAppThunkDispatch } from '../../store';
import {
    fetchTasks,
    fetchTags,
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getActiveTask,
    getTags,
    setActiveTask,
} from '../../store/taskSlice';

// Components
import { Task } from '../../components/Task';
import { TaskForm } from '../../components/Forms/TaskForm';

export const TaskManagerPage: React.FC = () => {
    const [
        defaultTaskFormValues,
        setDefaultTaskFormValues,
    ] : [
        defaultTaskFormValues: TaskRequestData | null,
        setDefaultTaskFormValues: React.Dispatch<any>,
    ] = useState(null);
    const dispatch = useAppThunkDispatch();
    const taskList: TaskModel[] = useSelector(getTasks);
    const isTaskListEmpty: boolean = !taskList.length;
    const tags: TagModel[] = useSelector(getTags);
    const activeTask = useSelector(getActiveTask);
    const getDefaultTaskFormValue = (task?: TaskModel): TaskRequestData => {
        if (!task) {
            return {
                completed:   false,
                title:       '',
                description: '',
                deadline:    new Date(),
                tag:         Array.isArray(tags) && tags[ 0 ].id,
            } as TaskRequestData;
        }

        const {
            id,
            created,
            tag,
            ...taskDefaultValue
        } = task;

        return {
            ...taskDefaultValue,
            tag: tag.id,
        } as TaskRequestData;
    };
    const resetTaskManagerState = () => {
        dispatch(setActiveTask(null));
        setDefaultTaskFormValues(null);
    };
    const handlerOnCreateTask = () => {
        dispatch(setActiveTask(null));
        setDefaultTaskFormValues(getDefaultTaskFormValue());
    };
    const handlerOnEditTask = (task: TaskModel) => {
        dispatch(setActiveTask(task));
        setDefaultTaskFormValues(getDefaultTaskFormValue(task));
    };
    const handlerOnRemoveTask = () => {
        if (!activeTask) {
            return;
        }

        void dispatch(deleteTask(activeTask.id))
            .then((response: any) => {
                const { payload } = response;
                if (payload) {
                    resetTaskManagerState();
                }

                return response;
            });
    };
    const handlerOnFormSubmit
        = (body: TaskRequestData) => {
            if (!activeTask) {
                return dispatch(createTask(body))
                    .then((response: any) => {
                        const { payload } = response;
                        if (payload) {
                            resetTaskManagerState();
                        }

                        return response;
                    });
            }

            return dispatch(updateTask({
                id: activeTask.id,
                body,
            }))
                .then((response: any) => {
                    const { payload } = response;
                    if (payload) {
                        resetTaskManagerState();
                    }

                    return response;
                });
        };

    useEffect(() => {
        void dispatch(fetchTasks(null));
        void dispatch(fetchTags(null));
    }, []);

    return (
        <main>
            <div className = 'controls'>
                <button
                    type = 'button'
                    className = 'button-create-task'
                    onClick = { handlerOnCreateTask }>
                    Нова задача
                </button>
            </div>
            <div className = 'wrap'>
                <div className = { isTaskListEmpty ? 'list empty' : 'list' }>
                    <div className = 'tasks'>
                        <>
                            { Array.isArray(taskList) && taskList
                                .map((task: TaskModel) => <Task
                                    key = { task.id }
                                    task = { task }
                                    onClick = { handlerOnEditTask } />)
                            }
                        </>
                    </div>
                </div>
                {
                    defaultTaskFormValues && (
                        <div className = 'task-card'>
                            <TaskForm
                                activeTask = { activeTask }
                                defaultValues = { defaultTaskFormValues }
                                handlerOnFormSubmit = { handlerOnFormSubmit }
                                handlerOnRemoveTask = { handlerOnRemoveTask }
                                handlerOnHideForm = { resetTaskManagerState } />
                        </div>
                    )
                }
            </div>
        </main>
    );
};
