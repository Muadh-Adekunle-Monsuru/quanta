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
	date: Date;
	content?: string;
	contentImage?: string;
	tags: [{ name: string; color: string }];
	creatorAvatar?: string;
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
				<p>{data.date.toUTCString().slice(0, 12)}</p>
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
						{data.tags.length < 1 ? (
							<>
								<span
									className='size-1 rounded-full p-1 border mr-1'
									style={{ backgroundColor: data.tags[0]?.color }}
								/>
								<span>{data.tags[0]?.name}</span>
							</>
						) : (
							<span className=' font-light'>Add tag</span>
						)}
					</Badge>
				</div>
				<div>
					<AvatarComponent
						image={data.creatorAvatar || ''}
						fallback='u'
						key={data.id}
					/>
				</div>
			</div>
		</div>
	);
}
