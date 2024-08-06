import React from 'react';

export default function ItemCard({
	data,
	ref,
}: {
	data: string;
	ref: HTMLElement | null;
}) {
	return (
		<div ref={ref} className='w-full min-h-52 bg-white '>
			{data}
		</div>
	);
}
