// Core
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TaskModel } from '../../types/TaskModel';

// Store
import { fetchTasks, getTasks } from '../../store/taskSlice';

// Components
import { Task } from '../../components/Task';

export const TaskManagerPage: FC = () => {
    const dispatch: ThunkDispatch<any, any, any> = useDispatch();
    const taskList: TaskModel[] = useSelector(getTasks);
    const isTaskListEmpty: boolean = !taskList.length;

    useEffect(() => {
        dispatch(fetchTasks(null));
    }, []);

    return (
        <main>
            <div className = 'controls'>
                <button type = 'button' className = 'button-create-task'>
                    Нова задача
                </button>
            </div>
            <div className = 'wrap'>
                <div className = { isTaskListEmpty ? 'list empty' : 'list' }>
                    <div className = 'tasks'>
                        <>
                            { Array.isArray(taskList) && taskList.map((task: TaskModel) => <Task
                                task = { task }
                                key = { task.id } />)
                            }
                        </>
                    </div>
                </div>
            </div>
        </main>
    );
};
