'use client';
import { useZustandStore } from '@/lib/Zustand';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { createBoardItem, updateSpaceBoardName } from '@/prisma';
import { useDroppable } from '@dnd-kit/core';
import { PenSquare, Plus } from 'lucide-react';
import React, { useState } from 'react';

export default function Droppable({
	children,
	boardId,
	name,
	projectId,
	spaceId,
	count,
}: {
	children: React.ReactNode;
	boardId: string;
	name: string;
	projectId: string;
	count: number;
	spaceId: string;
}) {
	const [editBoardName, setEditBoardName] = useState(false);
	const [boardName, setBoardName] = useState(name);
	const { setRefresh } = useZustandStore();
	const { isOver, setNodeRef } = useDroppable({
		id: boardId,
	});
	const { getLocalUser } = useLocalStorage('localuser');
	const localUser = getLocalUser();
	const user = JSON.parse(localUser);

	const handleSubmit = async () => {
		setEditBoardName(false);
		await updateSpaceBoardName(projectId, spaceId, name, boardName);
		setRefresh();
	};

	return (
		<div
			ref={setNodeRef}
			className=' p-3 bg-gray-200/60 rounded-lg min-h-screen shadow-md border lg:w-full w-72 min-w-72'
		>
			<div className='flex items-center justify-between pb-4 '>
				<div className='flex gap-5 items-center'>
					<div className='flex gap-1 group'>
						{editBoardName ? (
							<>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleSubmit();
									}}
								>
									<input
										value={boardName}
										onChange={(e) => setBoardName(e.target.value)}
										onBlur={() => {
											handleSubmit();
										}}
										className='bg-transparent outline-none text-xl '
									/>
								</form>
							</>
						) : (
							<h1 className='font-semibold text-xl pl-3 cursor-default'>
								{name}
							</h1>
						)}
						<PenSquare
							className='size-3 hidden group-hover:flex cursor-pointer'
							onClick={() => setEditBoardName(true)}
						/>
					</div>
					<p className='font-semibold text-muted-foreground'>{count}</p>
				</div>
				<Plus
					className='size-5 cursor-pointer'
					onClick={async () => {
						const response = await createBoardItem(
							projectId,
							spaceId,
							boardId,
							user.avatar
						);
						if (response) return setRefresh();
					}}
				/>
			</div>
			<div className='flex flex-col gap-3'>{children}</div>
		</div>
	);
}
