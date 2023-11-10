import React, { useMemo } from 'react'
import { Task } from './Task'
import { SortableContext } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities";

export const Column = ({column, createTask,tasks}) => {

    const taskIds = tasks.map(({id})=>id);
    const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
        id:column.id,
        data: {
            type: "Column",
            column,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

  return (
    <div className='bg-columnBG w-[350px] h-[500px]
    max-h-[500px] rounded-md flex flex-col'>
        <header className=' bg-mainBG text-base h-[60px] 
        rounded-md rounded-b-none p-3 font-bold border-columnBG border-4'>
            {column.title}
        </header>

        <main 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
         className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
            {/* In the sortable context need to pass items which are ids of all your array elements */}
            <SortableContext items={taskIds}>
            {tasks.map(task=>(
                <Task key={task.id} task={task}/>
            ))}
            </SortableContext>
        </main>

        <footer>
            <button className='border-columnBG border-2 rounded-md p-4
            border-x-columnBG bg-mainBG hover:text-rose-500'
            onClick={()=>createTask(column.id)}>Add Task</button>
        </footer>
    </div>
  )
}



// import React from 'react'
// import { Task } from './Task'

// export const Column = ({title, tasks, id}) => {
//   return (
//     <div className='bg-[#f4f5f7] rounded-sm w-80 h-96 overflow-y-scroll border'>
//         <h1 className='p-2 bg-pink-400 text-center'>{title}</h1>

//         {/* Now in this space we will have all our droppables, need to give a callback fn inside the component first */}
//         <Droppable droppableId={id} >
//             {(provided, snapshot)=>{
//                 <ul className='p-1 bg-[#f4f5f7] flex-grow min-h-[100px] transition-opacity'
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 isDraggingOver={snapshot.isDraggingOver}
//                 >
//                     {/* Provide List of all Tasks here */}
//                     <Task task={{id:123,title:"Make a progress board application"}} index={1}/>
//                     {provided.placeholder}
//                 </ul>
//             }}
//         </Droppable>
//         {/* <ul className='p-1 bg-[#f4f5f7] flex-grow min-h-[100px] transition-opacity'></ul> */}
//     </div>
//   )
// }

// // In React dnd, snapshots are like objects which provide current state of droppable/draggable component while it's being dragged
// // So that you can dynamically change the object while it is being dragged
