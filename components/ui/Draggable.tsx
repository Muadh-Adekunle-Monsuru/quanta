import { useZustandStore } from '@/lib/Zustand';
import { deleteItem, updateItemContent, updateItemImage } from '@/prisma';
import { useDraggable } from '@dnd-kit/core';
import { Item } from '@prisma/client';
import { ImagePlus, Link, Loader, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AvatarComponent from './AvatarComponent';
import { Input } from './input';

export default function Draggable({
	data,
	projectId,
	spaceId,
	boardId,
}: {
	data: Item;
	projectId: string;
	spaceId: string;
	boardId: string;
}) {
	const { setRefresh } = useZustandStore();
	const [content, setContent] = useState(data.content);
	const [editContent, setEditContent] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [showLinkInput, setShowLinkInput] = useState(false);
	const [imageLink, setImageLink] = useState('');
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: data.id,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	async function updateContent() {
		setEditContent(false);
		const response = await updateItemContent(
			projectId,
			spaceId,
			boardId,
			data.id,
			content!
		);

		if (response) setRefresh();
	}

	const handleImageUpload = async (event: any) => {
		const url = 'https://api.cloudinary.com/v1_1/dzrkcnt5h/image/upload';

		console.log(projectId, spaceId, boardId, data.id);
		setUploading(true);
		const formdata = new FormData();
		formdata.append('file', event.target.files[0]);
		formdata.append('upload_preset', 'lhdsrf26');
		await fetch(url, {
			method: 'POST',
			body: formdata,
		})
			.then((response) => {
				return response.text();
			})
			.then(async (textdata) => {
				// console.log(textdata);
				let dataJson = JSON.parse(textdata);
				// console.log();
				await updateItemImage(
					projectId,
					spaceId,
					boardId,
					data.id,
					dataJson.url
				);
				setRefresh();
			});
		setUploading(false);
	};

	const handleImageLink = async () => {
		await updateItemImage(projectId, spaceId, boardId, data.id, imageLink);
		setRefresh();
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			className='w-full min-h-32 bg-white shadow-sm border rounded-md p-3 flex flex-col justify-between group '
		>
			<div
				className='flex items-center justify-between  text-muted-foreground text-sm'
				{...listeners}
			>
				<p># {data.index}</p>
				<div className='flex items-center gap-2'>
					<p>{data.date.toUTCString().slice(0, 12)}</p>
				</div>
			</div>
			{data.contentImage && (
				<div
					className='h-40 w-full  overflow-hidden rounded-lg pt-2'
					{...listeners}
				>
					<img
						src={data.contentImage}
						className='w-full h-full object-cover object-center'
						width={900}
						height={80}
						alt='content image'
					/>
				</div>
			)}
			<div
				className='flex flex-col gap-1 py-3 cursor-text'
				onClick={(e) => {
					e.stopPropagation();
					console.log('clicked');
					setEditContent(true);
				}}
			>
				{editContent ? (
					<textarea
						className='outline-none text-sm'
						value={content || ''}
						onChange={(e) => setContent(e.target.value)}
						onBlur={() => {
							setEditContent(false);
							updateContent();
						}}
					></textarea>
				) : (
					<p className='flex-grow text-sm font-medium z-40'>{content}</p>
				)}
			</div>
			<div>
				<div className='text-transparent group-hover:text-muted-foreground cursor-default'>
					<div className='flex gap-3'>
						{uploading ? (
							<Loader className='animate-spin size-4' />
						) : (
							<ImagePlus
								className='size-4 z-10 cursor-pointer hover:text-black'
								onClick={() =>
									document.getElementById(`fileInput-${data.id}`)!.click()
								}
							/>
						)}
						<Link
							className='size-4 cursor-pointer hover:text-black'
							onClick={() => setShowLinkInput((prev) => !prev)}
						/>
						<Trash2
							className='size-4 cursor-pointer'
							onClick={async () => {
								await deleteItem(projectId, spaceId, boardId, data.id);
								setRefresh();
							}}
						/>
					</div>
					<Input
						id={`fileInput-${data.id}`}
						name='files[]'
						type='file'
						onChange={handleImageUpload}
						placeholder='submit'
						className='hidden'
					/>

					{showLinkInput && (
						<Input
							className=''
							type='text'
							placeholder='Paste image link'
							value={imageLink}
							onChange={(e) => setImageLink(e.target.value)}
							onBlur={() => {
								setShowLinkInput(false);
								if (imageLink) {
									handleImageLink();
								}
							}}
						/>
					)}
				</div>
			</div>
			<div className='flex justify-between items-center ' {...listeners}>
				<div className='flex items-center gap-4'></div>
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
