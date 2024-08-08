'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import Draggable from './Draggable';
import Dropable from './Dropable';
import DraggableOverlay from './DraggableOverlay';
import { Board, BoardReference, Space } from '@prisma/client';
import { ChildProcess } from 'child_process';

export default function DndKit({
	data,
	projectId,
	spaceId,
}: {
	data: BoardReference[];
	projectId: string;
	spaceId: string;
}) {
	const [activeId, setActiveId] = useState(null);
	const [containers, setContainer] = useState([
		{
			name: 'A',
			children: [
				{
					id: 'A1',
					index: 1,
					date: '23-04-24',
					content: 'Optimize tweets for improved engagement and readability',
					contentImage: '',
					tag: 'UX',
					tagColor: '#ffafcc',
					creator: 'Ali',
					comments: [],
				},
				{
					id: 'A2',
					index: 2,
					date: '23-04-25',
					content: 'Analyze user feedback for product improvement',
					contentImage: '',
					tag: 'Analytics',
					tagColor: '#d4a373',
					creator: 'Ali',
					comments: [],
				},
			],
		},
		{
			name: 'B',
			children: [
				{
					id: 'B1',
					index: 1,
					date: '23-04-26',
					content: 'Design a new landing page',
					contentImage: '',
					tag: 'Design',
					tagColor: '#a8dadc',
					creator: 'John',
					comments: [],
				},
				{
					id: 'B2',
					index: 2,
					date: '23-04-27',
					content: 'Implement SEO strategies for blog posts',
					contentImage: '',
					tag: 'SEO',
					tagColor: '#a8dadc',
					creator: 'John',
					comments: [],
				},
			],
		},
		{
			name: 'C',
			children: [
				{
					id: 'C1',
					index: 1,
					date: '23-04-28',
					content: 'Conduct market research for new product line',
					contentImage: '',
					tag: 'Research',
					tagColor: '#ffafcc',
					creator: 'Jane',
					comments: [],
				},
				{
					id: 'C2',
					index: 2,
					date: '23-04-29',
					content: 'Improving the visuals of the payment plan comparison table',
					contentImage: '',
					tag: 'Design',
					tagColor: '#ffafcc',
					creator: 'Jane',
					comments: [],
				},
			],
		},
	]);

	// const handleDragStart = (event: DragEndEvent) => {
	// 	setActiveId(event.active.id);
	// };

	function handleDragEnd(event: DragEndEvent) {
		setActiveId(null);
		const { over, active } = event;

		if (!over) return null;

		const newContainer = containers.map((dropBox) => {
			if (dropBox.children.find((child) => child.id == active.id)) {
				dropBox.children = dropBox.children.filter(
					(child) => child.id !== active.id
				);
			}

			if (dropBox.name == over?.id) {
				dropBox.children = [
					...dropBox.children,
					{
						id: active.id.toString(),
						content: `Imposter ${active.id} `,
						index: 2,
						date: '23-04-29',
						contentImage: '',
						tag: 'Design',
						tagColor: '#ffafcc',
						creator: 'Jane',
						comments: [],
					},
				];
			}
			return dropBox;
		});
		setContainer(newContainer);
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
