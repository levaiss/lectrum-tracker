// Core
import { FC } from 'react';
import { TaskModel } from '../../types/TaskModel';

// Instruments
import { formatDate } from '../../utils/format-date';

interface TaskPropsType {
    task: TaskModel
    onClick?: (task: TaskModel) => void
}

export const Task: FC<TaskPropsType> = ({ task, onClick = () => {} }) => {
    const isOverdue: boolean
        = new Date(task.deadline).getTime() < Date.now();
    const getTaskClassName = (): string => {
        let result: string = 'task';

        if (isOverdue && !task.completed) {
            result += ' overdue';
        }

        if (task.completed) {
            result += ' completed';
        }

        return result;
    };

    return (
        <div
            className = { getTaskClassName() }
            onClick = { () => { onClick(task); } }>
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
