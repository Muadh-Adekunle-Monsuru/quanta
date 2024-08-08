'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import Draggable from './Draggable';
import Dropable from './Dropable';
import DraggableOverlay from './DraggableOverlay';
import { Board, BoardReference, Space } from '@prisma/client';
import { ChildProcess } from 'child_process';
import { updateCardPosition } from '@/prisma';
import { useZustandStore } from '@/lib/Zustand';

export default function DndKit({
	data,
	projectId,
	spaceId,
}: {
	data: BoardReference[];
	projectId: string;
	spaceId: string;
}) {
	const { setRefresh } = useZustandStore();
	async function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;

		if (!over) return null;
		console.log(`card ${active.id} move to ${over.id}`);
		await updateCardPosition(
			projectId,
			spaceId,
			over.id.toString(),
			active.id.toString()
		);
		setRefresh();
	}
	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='flex gap-5'>
				{data?.map((item) => (
					<Dropable
						key={item.id}
						boardId={item.id}
						name={item.name}
						projectId={projectId}
						spaceId={spaceId}
						count={item.items.length}
						// className=''
					>
						{item.items.map((child) => (
							<Draggable
								key={child.id}
								data={child}
								projectId={projectId}
								spaceId={spaceId}
								boardId={item.id}
							/>
						))}
					</Dropable>
				))}
			</div>
		</DndContext>
	);
}
