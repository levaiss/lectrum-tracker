// Core
import { FC } from 'react';
import { TaskModel } from '../../types/TaskModel';

// Instruments
import { formatDate } from '../../utils/format-date';


interface TaskPropsType {
    task: TaskModel
}

export const Task: FC<TaskPropsType> = ({ task }) => {
    return (
        <div className = { task.completed ? 'task completed' : 'task' }>
            <span className = 'status'></span>
            <span className = 'title'>{ task.title }</span>
            <span className = 'deadline'>{ formatDate(new Date(task.deadline), 'dd LLL yyyy') }</span>
            <span
                className = 'tag'
                style = { {
                    color:           task.tag?.color,
                    backgroundColor: task.tag?.bg,
                } }>
                { task.tag?.name }
            </span>
        </div>
    );
};
