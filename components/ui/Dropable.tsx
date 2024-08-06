'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

export default function Droppable(props: any) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});
	return (
		<div
			ref={setNodeRef}
			className=' p-3 bg-gray-200 rounded-lg min-h-screen shadow-md border w-full min-w-72'
		>
			<div className='flex items-center justify-between pb-4 '>
				<h1 className='font-semibold text-xl'>{props.id}</h1>
				<Plus className='size-4 cursor-pointer' />
			</div>
			<div className='flex flex-col gap-3'>{props.children}</div>
		</div>
	);
}
