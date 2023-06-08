// Core
import { FC } from 'react';

export const TaskManagerPage: FC = () => {
    return (
        <main>
            <div className = 'controls'>
                <button type = 'button' className = 'button-create-task'>
                    Нова задача
                </button>
            </div>
            <div className = 'wrap'>
                <div className = 'list empty'>
                    <div className = 'tasks'></div>
                </div>
            </div>
        </main>
    );
};
