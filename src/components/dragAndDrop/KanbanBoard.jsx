import React, { useMemo, useState } from 'react'
import { Column } from './Column';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Task } from './Task';
import { createPortal } from 'react-dom';

const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8; // Adjust the length of the generated id as needed
    let id = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
  
    return id;
  };

export const KanbanBoard = () => 
{
    const [columns,setColumns] = useState([{id:"111",title:"Pending"},
{id:"222",title:"Done"}])

    const [tasks,setTasks] = useState([{id:"1",columnId:"111",content:"Get a job"},
    {id:"2",columnId:"222",content:"Finish Project"}]);

    const [activeTask, setActiveTask] = useState(null);

    const createTask = (columnId) =>
    {
        const newTask = {id:generateId(),columnId,content:`Task ${tasks.length + 1}`}
        setTasks(prev=>[...prev,newTask]);
    }
    console.log(tasks);

    const columnIds = columns.map(({id})=>id);

    const onDragStart=(event)=>
{
    if(event.active.data.current?.type === "Task")
    {
        setActiveTask(event.active.data.current.task);
        return;
    }
}
    const onDragOver=(event)=>
    {
        // The active and over represent the card which we have holded n 
        // over is the card we are hovering on top of
        const {active, over} = event;
        if(!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Check if picked element and the element we hover on is same
        // if it's same then kuch change nhi karna hai right? It's literally same position
        if(activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task"

        if(!isActiveATask) return;

        //We check for 2 cases
        // I am dropping a task over another task
        if(isActiveATask && isOverATask) {
            setTasks((task) =>
            {
                // Finding indexes here as we need to shuffle them
                // activeId is same because we always give draggable id remember?
                const activeIndex = task.findIndex((t)=> t.id === activeId);
                const overIndex = task.findIndex((t) => t.id === overId);

                // If we drop the task on a task on different column, just gotta check overId
                // We can also 
                if(task[activeIndex].columnId!== task[overIndex].columnId)
                {
                    task[activeIndex].columnId = task[overIndex].columnId;
                }

                // This is a smooth inbuilt function which switches positions of
                // 2 elements in an array based on index given.
                return arrayMove(task, activeIndex, overIndex);
            })
        }

        // I am dropping a task over another column i.e when no tasks are there in column

        const isOverAColumn = over.data.current?.type === "Column";
        if(isActiveATask && isOverAColumn) {
            setTasks((tasks)=>{
                const activeIndex = tasks.findIndex((t)=>t.id === activeId);

                tasks[activeIndex].columnId = overId;

                // The reason we are using arrayMove with same 2 indexes is bc we get new array
                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    }

    return (
        <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto
         overflow-y-hidden px-[40px]'>
            <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={()=>setActiveTask(null)}>
                <section className='flex gap-4'>
                    <SortableContext items={columnIds}>
                    {columns.map(col=>(
                        <Column column={col} key={col.id} createTask={createTask}
                        tasks={tasks.filter(task=>task.columnId === col.id)}
                        />
                    ))}
                    </SortableContext>
                </section>
                {createPortal(<DragOverlay>
                    {activeTask && (
                        <Task task={activeTask}/>
                    )}
                </DragOverlay>, document.body)}
            </DndContext>
            {/* <aside className='m-auto'>
                <button className='h-[60px] w-[35px] min-w-[350px]
                 cursor-pointer rounded-lg bg-mainBG border-2 border-columnBG
                  p-4 ring-rose-500 hover:ring-2'> Add Column</button>
            </aside> */}
        </div>
    )

}
