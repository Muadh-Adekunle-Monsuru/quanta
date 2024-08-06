import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from './button';
import Image from 'next/image';
import { Badge } from './badge';
import { MessageCircle } from 'lucide-react';
import { Avatar } from './avatar';
import AvatarComponent from './AvatarComponent';

type ItemProp = {
	id: string;
	index: number;
	date: string;
	content: string;
	contentImage: string;
	tag: string;
	tagColor: string;
	creator: string;
	comments: string;
};

export default function Draggable(props: any) {
	const data: ItemProp = props.data;
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.id,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='w-full min-h-32 bg-white shadow-sm border rounded-md p-3 flex flex-col justify-between'
		>
			<div className='flex items-center justify-between  text-muted-foreground text-sm'>
				<p># {data.index}</p>
				<p>{data.date.slice(0, 5)}</p>
			</div>
			<div className='flex flex-col gap-1 py-3'>
				{data.contentImage && (
					<Image src={data.contentImage} className='' alt='content image' />
				)}
				<p className='flex-grow text-sm font-medium'>{data.content}</p>
			</div>
			<div className='flex justify-between items-center '>
				<div className='flex items-center gap-4'>
					<Badge variant={'secondary'} className='text-muted-foreground'>
						<span
							className='size-1 rounded-full p-1 border mr-1'
							style={{ backgroundColor: data.tagColor }}
						/>
						{data.tag}
					</Badge>
					<div className='flex items-center gap-1 text-muted-foreground'>
						<MessageCircle className='size-4' />
						<p className='text-xs'>{data.comments.length}</p>
					</div>
				</div>
				<div>
					<AvatarComponent image='' fallback={data.creator[0]} key={data.id} />
				</div>
			</div>
		</div>
	);
}
