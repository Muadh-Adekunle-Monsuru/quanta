'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useZustandStore } from '@/lib/Zustand';
import { changeVisibility, Delete, updateBoardTitle } from '@/prisma';
import { Board } from '@prisma/client';
import { EllipsisVertical, GitGraph, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from './badge';
export type BoardCardProps = {
	id: string;
	date: string;
	public: boolean;
	title: string;
};

export default function BoardCard(data: Board) {
	const [showBox, setShowBox] = useState(false);
	const [title, setTitle] = useState(data.name);
	const setRefresh = useZustandStore((state) => state.setRefresh);

	const updateTitle = async () => {
		setShowBox(false);
		await updateBoardTitle(data.id, title);
	};
	return (
		<div className='w-full aspect-square rounded-lg border bg-gray-100 flex flex-col'>
			<Link
				href={`/board/${data.id}`}
				className='flex-grow flex items-center justify-center'
			>
				<div>
					<GitGraph className='size-6' />
				</div>
			</Link>
			<div className='flex justify-between items-center p-2 bg-gray-50'>
				<div className='w-full'>
					{showBox ? (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								updateTitle();
							}}
						>
							<input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='outline-none border-0 focus:outline-none'
								onBlur={() => updateTitle()}
							/>
						</form>
					) : (
						<h2
							className='truncate line-clamp-1 text-wrap'
							onClick={() => setShowBox(true)}
						>
							{title}
						</h2>
					)}
					<div className='flex gap-2 items-center'>
						<p className='text-xs text-muted-foreground'>
							<span>{data.createdAt.toLocaleDateString()}</span>
							<span className='ml-2'>
								{data.createdAt.toLocaleTimeString().slice(0, 4)}
							</span>
						</p>
						{data.public && (
							<Badge className={` text-xs text-green-900 bg-green-100`}>
								Public
							</Badge>
						)}
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<EllipsisVertical className='size-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={async () => {
								changeVisibility(data.id, !data.public);
								setRefresh();
							}}
						>
							<Globe
								className={`${
									data.public ? 'text-muted-foreground' : 'text-green-600'
								}  inline size-4 mr-2`}
							/>
							<span className='mr-1'>Make</span>
							{data.public ? 'Private' : 'Public'}
						</DropdownMenuItem>
						<DropdownMenuItem
							className='hover:bg-red-400 hover:text-red-950'
							onClick={async () => {
								await Delete(data.id);
								setRefresh();
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
