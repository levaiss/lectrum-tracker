// Core
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

// Instruments
import { TagModel, TaskModel } from '../types/TaskModel';
import { api } from '../api';
import { isAxiosError } from '../utils/helpers';
import { setErrorMessage } from './uiSlice';

export interface taskSliceState {
    tasks: TaskModel[]
    tags: TagModel[]
}

const initialState: taskSliceState = {
    tasks: [],
    tags:  [],
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
    },
});

export const getTasks = (state: RootState): TaskModel[] => state.task.tasks;

export const getTags = (state: RootState): TagModel[] => state.task.tags;

export const { setTasks, setTags } = taskSlice.actions;

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
