import { EllipsisVertical, GitGraph } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export type BoardCardProps = {
	id: string;
	date: string;
	public: boolean;
	title: string;
};

export default function BoardCard(data: BoardCardProps) {
	return (
		<Link href={`/board/${data.id}`}>
			<div className='w-full aspect-square rounded-lg border bg-gray-100 flex flex-col'>
				<div className='flex-grow flex items-center justify-center'>
					<GitGraph className='size-6' />
				</div>
				<div className='flex justify-between items-center p-2'>
					<div className='w-full'>
						<h2 className='truncate line-clamp-1 text-wrap'>{data.title}</h2>
						<p className='text-xs text-muted-foreground'>{data.date}</p>
					</div>
					<EllipsisVertical className='size-4' />
				</div>
			</div>
		</Link>
	);
}
