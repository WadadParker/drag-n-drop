import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities";

export const Task = ({task}) => {

    const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
        id:task.id,
        data: {
            type: "Task",
            task,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    // We need to give an overlay so that performance issue na ho
    if(isDragging) {
        return (
            <div ref={setNodeRef} style={style} 
            className=' bg-mainBG p-2.5 h-[100px] min-h-[100px] 
            items-center flex text-left rounded-xl border-2 border-rose-500
            cursor-grab relative opacity-30'></div>
        )
    }

  return (
    <div 
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
     className=' bg-mainBG p-2.5 h-[100px] min-h-[100px]
    items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
    hover:ring-rose-500 cursor-grab'
    
    >{task.content}
    </div>
  )
}

