// Core
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

// Instruments
import { TagModel, TaskModel } from '../types/TaskModel';
import { TaskRequestData, TaskUpdateRequestData } from '../types/Api';
import { api } from '../api';
import { isAxiosError } from '../utils/helpers';
import { setErrorMessage } from './uiSlice';

export interface taskSliceState {
    tasks: TaskModel[]
    tags: TagModel[]
    activeTask: TaskModel | null
}

const initialState: taskSliceState = {
    tasks:      [],
    tags:       [],
    activeTask: null,
};

export const taskSlice = createSlice({
    name:     'task',
    initialState,
    reducers: {
        setTasks: (state: taskSliceState, action) => {
            state.tasks = action.payload;
        },
        setTags: (state: taskSliceState, action) => {
            state.tags = action.payload;
        },
        setActiveTask: (state: taskSliceState, action) => {
            state.activeTask = action.payload;
        },
    },
});

export const getTasks = (state: RootState): TaskModel[] => state.task.tasks;

export const getTags = (state: RootState): TagModel[] => state.task.tags;

export const getActiveTask
    = (state: RootState): TaskModel | null => state.task.activeTask;

export const { setTasks, setTags, setActiveTask } = taskSlice.actions;

export const fetchTasks = createAsyncThunk<TaskModel[], any, any>(
    'task/tasks',
    async (param, thunkAPI) => {
        try {
            const { data: tasks } = await api.tasks.all();
            thunkAPI.dispatch(setTasks(tasks));

            return tasks;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const createTask = createAsyncThunk<TaskModel, TaskRequestData, { state: RootState }>(
    'task/createTask',
    async (body: TaskRequestData, thunkAPI) => {
        try {
            const { data: task } = await api.tasks.create(body);
            const state: RootState = thunkAPI.getState();
            thunkAPI.dispatch(setTasks([
                task,
                ...state.task.tasks,
            ]));

            return task;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const updateTask = createAsyncThunk<TaskModel, TaskUpdateRequestData, any>(
    'task/updateTask',
    async (payload: TaskUpdateRequestData, thunkAPI) => {
        try {
            const { data: task } = await api.tasks.update(payload);
            void thunkAPI.dispatch(fetchTasks(null));

            return task;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const deleteTask = createAsyncThunk<any, string, { state: RootState }>(
    'task/deleteTask',
    async (id: string, thunkAPI) => {
        try {
            await api.tasks.delete(id);
            void thunkAPI.dispatch(fetchTasks(null));
            const state: RootState = thunkAPI.getState();
            thunkAPI.dispatch(setTasks(state.task.tasks.filter(({ id: taskId }) => {
                return taskId !== id;
            })));

            return true;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return false;
        }
    },
);

export const fetchTags = createAsyncThunk<TagModel[], any, any>(
    'task/tags',
    async (param, thunkAPI) => {
        try {
            const { data: tags } = await api.tags.all();
            thunkAPI.dispatch(setTags(tags));

            return tags;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);
