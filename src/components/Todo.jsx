import React, { useEffect, useState } from 'react';
import Items from './Items';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState('');

    useEffect(() => {
        let data = localStorage.getItem('todoTasks');
        if (data) {
            setTasks(JSON.parse(data));
        }
    }, []);

    const addTask = () => {
        let id = 0;
        if (tasks.length === 0) {
            id = 1;  // Start ID from 1
        } else {
            id = tasks[tasks.length - 1].id + 1; // Increment the ID
        }
        if (inputTask.trim() !== '') {
            const newTasks = [...tasks, { task: inputTask, id }];
            localStorage.setItem('todoTasks', JSON.stringify(newTasks));
            setTasks(newTasks);
            setInputTask('');
        }
    };

    const deleteTask = (id) => {
        const leftTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem('todoTasks', JSON.stringify(leftTasks));
        setTasks(leftTasks);
    };

    const updateTask = (newtask, id) => {
        const updated = tasks.map((task) =>
            task.id === id ? { task: newtask, id } : task
        );

        if (newtask.trim()) {
            localStorage.setItem('todoTasks', JSON.stringify(updated));
            setTasks(updated);
        } else {
            deleteTask(id);
        }
    };

    const deleteAll = () => {
        setTasks([]);
        localStorage.setItem('todoTasks', '[]');
    };

    return (
        <div className='w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-10 px-4'>
            <div className='w-full max-w-[500px] bg-gradient-to-r from-slate-700 to-slate-600 m-auto text-white rounded-lg shadow-xl'>
                <h1 className='text-center text-white font-bold text-2xl pt-6 pb-3 underline'>
                    Todo List
                </h1>

                <div className='flex flex-col px-5'>
                    <div className='flex flex-col gap-3'>
                        {tasks.map((task) => (
                            <Items key={task.id} task={task} deleteTass={deleteTask} update={updateTask} />
                        ))}
                    </div>

                    <div className='py-5 relative mt-2'>
                        <input
                            type='text'
                            className='w-full bg-transparent outline-none text-white border-2 rounded-lg py-3 px-4 border-violet-600 transition-all duration-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400'
                            placeholder='Add something to your list'
                            value={inputTask}
                            onChange={(e) => setInputTask(e.target.value)}
                            onKeyDown={(e)=>{if(e.key === "Enter"){addTask()}}}
                        />
                        <button
                            className='text-white bg-gradient-to-r from-violet-600 to-indigo-600 py-3 px-5 absolute right-0 top-1/2 transform -translate-y-1/2 rounded-lg transition-all duration-300 hover:scale-105'
                            onClick={addTask}
                        >
                            Add
                        </button>
                    </div>

                    {tasks.length > 0 && (
                        <button
                            className='bg-red-600 text-white px-4 py-2 rounded-lg w-full mb-6 transition-all duration-300 hover:bg-red-700'
                            onClick={deleteAll}
                        >
                            Delete All Tasks
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todo;
