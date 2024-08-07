'use client';
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { PenSquare, Plus } from 'lucide-react';
import { createBoardItem, updateSpaceBoardName } from '@/prisma';
import { useZustandStore } from '@/lib/Zustand';
import { useLocalStorage } from '@/lib/useLocalStorage';

export default function Droppable(props: any) {
	const [editBoardName, setEditBoardName] = useState(false);
	const [boardName, setBoardName] = useState(props.id);
	const { setRefresh } = useZustandStore();
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});
	const { getLocalUser } = useLocalStorage('localuser');
	const localUser = getLocalUser();
	const user = JSON.parse(localUser);

	const handleSubmit = async () => {
		setEditBoardName(false);
		await updateSpaceBoardName(
			props.boardId,
			props.spaceName,
			props.id,
			boardName
		);
		setRefresh();
	};

	return (
		<div
			ref={setNodeRef}
			className=' p-3 bg-gray-200 rounded-lg min-h-screen shadow-md border lg:w-full w-72 min-w-72'
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
								{props.name}
							</h1>
						)}
						<PenSquare
							className='size-3 hidden group-hover:flex cursor-pointer'
							onClick={() => setEditBoardName(true)}
						/>
					</div>
					<p className='font-semibold text-muted-foreground'>{props.count}</p>
				</div>
				<Plus
					className='size-5 cursor-pointer'
					onClick={async () => {
						const response = await createBoardItem(
							props.boardId,
							props.spaceId,
							props.id,
							user.avatar
						);
						if (response) return setRefresh();
					}}
				/>
			</div>
			<div className='flex flex-col gap-3'>{props.children}</div>
		</div>
	);
}
