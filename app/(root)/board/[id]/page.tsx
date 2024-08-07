'use client';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
	Ellipsis,
	Loader2,
	PenSquare,
	PenSquareIcon,
	Plus,
	Trash,
} from 'lucide-react';
import DndKit from '@/components/ui/DndKit';
import {
	createNewSpace,
	deleteSpace,
	GetBoard,
	updateBoardTitle,
	updateSpaceName,
} from '@/prisma';
import { Board } from '@prisma/client';
import { useZustandStore } from '@/lib/Zustand';

export default function page() {
	const param = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [editSpace, setEditSpace] = useState({ index: 0, clicked: false });
	const [spaceName, setSpaceName] = useState('');
	// const [refresh, setRefresh] = useState(false);
	const { refresh, setRefresh } = useZustandStore();
	const [editTitle, setEditTitle] = useState(false);
	const [title, setTitle] = useState('');
	const [selectedBoard, setSelectedBoard] = useState(0);
	const [boardData, setBoarddata] = useState<Board>({
		createdAt: new Date(),
		creatorId: '',
		id: '',
		name: '',
		public: false,
		spaces: [],
	});
	useEffect(() => {
		const getBoardDetails = async () => {
			setLoading(true);
			const response = await GetBoard(`${param.id}`);
			setLoading(false);
			if (!response) return router.replace('/dashboard');

			setBoarddata(response);
			setTitle(response.name);
		};
		getBoardDetails();
	}, [refresh]);
	return (
		<section className='bg-gray-50 min-h-screen flex flex-col py-4 '>
			{loading && (
				<div className='w-screen h-screen bg-gray-700/15  fixed top-0 left-0 flex flex-col items-center justify-center'>
					<Loader2 className='size-9 animate-spin' />
				</div>
			)}
			<div className='flex justify-between p-3 items-center lg:px-14'>
				<div className='flex gap-2 group'>
					{editTitle ? (
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								setEditTitle(false);
								await updateBoardTitle(boardData.id, title);
							}}
						>
							<input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onBlur={async () => {
									setEditTitle(false);
									await updateBoardTitle(boardData.id, title);
								}}
								className='outline-none text-3xl'
							/>
						</form>
					) : (
						<h2 className='text-semibold text-3xl blur-[0.2px]'>{title}</h2>
					)}
					<PenSquareIcon
						className='size-3 hidden cursor-pointer group-hover:block'
						onClick={() => setEditTitle(true)}
					/>
				</div>
				<Ellipsis className='size-4' />
			</div>
			<section className='flex items-center gap-2 lg:px-14'>
				{boardData.spaces.map((space, index) => (
					<div className='group py-3 '>
						<div
							key={index}
							className={`relative rounded-3xl px-5 text-sm p-2 border   cursor-pointer ${
								index == selectedBoard
									? 'border-black bg-black text-white'
									: 'text-gray-400'
							}`}
							onClick={() => setSelectedBoard(index)}
						>
							{editSpace.clicked && index == editSpace.index ? (
								<form
									onSubmit={async (e) => {
										e.preventDefault();
										setEditSpace({ index, clicked: false });
										const response = await updateSpaceName(
											boardData.id,
											index,
											spaceName
										);
										if (response) {
											// setRefresh((prev) => !prev);
											setRefresh();
										}
									}}
								>
									<input
										value={spaceName}
										onBlur={async () => {
											setEditSpace({ index, clicked: false });
											const response = await updateSpaceName(
												boardData.id,
												index,
												spaceName
											);
											if (response) {
												// setRefresh((prev) => !prev);
												setRefresh();
											}
										}}
										onChange={(e) => {
											setSpaceName(e.target.value);
										}}
										className='outline-none bg-transparent max-w-20'
									/>
								</form>
							) : (
								<div>
									<span className=''>{space.name}</span>
									<div className='hidden group-hover:flex gap-2 absolute -bottom-5 text-gray-500'>
										<PenSquare
											className='size-4'
											onClick={(e) => {
												e.stopPropagation();
												setSpaceName(space.name);
												setEditSpace({ index, clicked: true });
											}}
										/>
										<Trash
											className='size-4'
											onClick={async (e) => {
												e.stopPropagation();
												await deleteSpace(boardData.id, index);

												setRefresh();
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				))}

				<div
					className='rounded-3xl px-5 text-sm p-1 border border-gray-300 bg-gray-100 border-dashed cursor-pointer'
					onClick={async () => {
						const response = await createNewSpace(boardData.id);
						if (response) {
							setRefresh();
							setSelectedBoard(boardData.spaces.length);
						}
					}}
				>
					Add Space <Plus className='size-4 inline' />
				</div>
			</section>
			<section className='flex-grow lg:px-14 overflow-x-scroll lg:overflow-x-auto py-5'>
				<DndKit
					data={boardData.spaces[selectedBoard]?.boards}
					boardId={boardData?.id}
					spaceId={boardData?.spaces[selectedBoard]?.id}
				/>
			</section>
		</section>
	);
}
