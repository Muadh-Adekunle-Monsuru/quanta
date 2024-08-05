import BoardCard from '@/components/ui/BoardCard';
import NewBoardCard from '@/components/ui/NewBoardCard';
import React from 'react';

export default function DashboardPage() {
	return (
		<div className='px-5 lg:mx-14 bg-gray-50 flex-grow rounded-lg'>
			<h1 className='py-3 text-xl font-medium'>Your Boards</h1>
			<div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4  w-full p-3'>
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<BoardCard />
				<NewBoardCard />
			</div>
		</div>
	);
}
