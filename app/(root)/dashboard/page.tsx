'use client';
import BoardCard, { BoardCardProps } from '@/components/ui/BoardCard';

import NewBoardCard from '@/components/ui/NewBoardCard';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useZustandStore } from '@/lib/Zustand';
import { createNewBoard, getallboards } from '@/prisma';
import { Board } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';

export default function DashboardPage() {
	const refresh = useZustandStore((state) => state.refresh);
	const setRefresh = useZustandStore((state) => state.setRefresh);
	const [boards, setBoards] = useState<Board[]>([]);
	const [loading, setLoading] = useState(false);
	const [clicked, setClicked] = useState(false);
	const router = useRouter();
	const { getLocalUser } = useLocalStorage('localuser');
	const localUser = getLocalUser();
	const user = JSON.parse(localUser);
	useEffect(() => {
		const FetchBoards = async () => {
			setLoading(true);
			const response = await getallboards(user.id);
			setBoards(response);
			setLoading(false);
		};
		FetchBoards();
	}, [refresh]);

	const handleCreate = async () => {
		try {
			await createNewBoard(user.id);
			setRefresh();
		} catch (e) {
			console.log('error getting local user', e);
		}
	};

	return (
		<div className='px-5 lg:mx-14 bg-gray-50 flex-grow rounded-lg'>
			<h1 className='py-3 text-xl font-medium'>Your Projects</h1>
			<div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  w-full p-3'>
				{loading && (
					<div className='w-screen h-screen bg-gray-700/15  fixed top-0 left-0 flex flex-col items-center justify-center'>
						<Loader2 className='size-9 animate-spin' />
					</div>
				)}
				{boards.map((card, index) => (
					<BoardCard
						key={index}
						createdAt={card.createdAt}
						name={card.name}
						id={card.id}
						public={card.public}
						spaces={card.spaces}
						creatorId={card.creatorId}
					/>
				))}
				<div onClick={() => handleCreate()}>
					<NewBoardCard />
				</div>
			</div>
		</div>
	);
}
