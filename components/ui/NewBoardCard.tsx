'use client';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { createNewBoard } from '@/prisma';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function NewBoardCard() {
	return (
		<div className='w-full aspect-square rounded-lg border bg-gray-200 flex items-center justify-center flex-col cursor-pointer hover:border-2 hover:border-gray-300 duration-300 transition'>
			<Plus className='size-14' />
			<p>New Board</p>
		</div>
	);
}
