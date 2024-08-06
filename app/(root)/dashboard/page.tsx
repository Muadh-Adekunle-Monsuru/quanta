'use client';
import BoardCard, { BoardCardProps } from '@/components/ui/BoardCard';

import NewBoardCard from '@/components/ui/NewBoardCard';
import React from 'react';

const boardCards: BoardCardProps[] = [
	{
		id: '1',
		date: '2024-08-01',
		public: true,
		title: 'Project Kickoff',
	},
	{
		id: '2',
		date: '2024-08-02',
		public: false,
		title: 'Design Review',
	},
	{
		id: '3',
		date: '2024-08-03',
		public: true,
		title: 'Sprint Planning',
	},
	{
		id: '4',
		date: '2024-08-04',
		public: false,
		title: 'Code Review',
	},
	{
		id: '5',
		date: '2024-08-05',
		public: true,
		title: 'Release Day',
	},
];
export default function DashboardPage() {
	return (
		<div className='px-5 lg:mx-14 bg-gray-50 flex-grow rounded-lg'>
			<h1 className='py-3 text-xl font-medium'>Your Projects</h1>
			<div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  w-full p-3'>
				{boardCards.map((card, index) => (
					<BoardCard
						date={card.date}
						title={card.title}
						id={card.id}
						public={card.public}
					/>
				))}
				<NewBoardCard />
			</div>
		</div>
	);
}
