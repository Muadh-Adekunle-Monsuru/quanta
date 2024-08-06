'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Ellipsis, Plus } from 'lucide-react';
import DndKit from '@/components/ui/DndKit';

export default function page() {
	const pathname = usePathname();
	return (
		<section className='bg-gray-50 min-h-screen flex flex-col py-4 '>
			<div className='flex justify-between p-3 items-center lg:px-14'>
				<h2 className='text-semibold text-3xl blur-[0.2px]'>Title</h2>
				<Ellipsis className='size-4' />
			</div>
			<section className='flex items-center gap-2 lg:px-14 py-3'>
				<div className='rounded-3xl px-5 text-sm p-1 border border-black bg-black text-white'>
					Design
				</div>
				<div className='rounded-3xl px-5 text-sm p-1 border border-gray-300 text-muted-foreground '>
					Code
				</div>
				<div className='rounded-3xl px-5 text-sm p-1 border  border-gray-300 text-muted-foreground'>
					Documentation
				</div>
				<div className='rounded-3xl px-5 text-sm p-1 border border-gray-300 text-muted-foreground'>
					Production
				</div>
				<div className='rounded-3xl px-5 text-sm p-1 border border-gray-300 bg-gray-100 border-dashed cursor-pointer'>
					Add Space <Plus className='size-4 inline' />
				</div>
			</section>
			<section className='flex-grow lg:px-14 overflow-x-scroll lg:overflow-x-auto py-5'>
				<DndKit />
			</section>
		</section>
	);
}
