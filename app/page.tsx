import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col px-5'>
			<header className='flex gap-1 items-center cursor-pointer border-b border-b-muted-background py-3'>
				<div className='size-10 rounded-full flex items-center justify-center'>
					<Image
						src='/logo.svg'
						alt='logo'
						width={50}
						height={50}
						className=' object-contain'
					/>
				</div>
				<h3 className='font-semibold text-2xl'>Quanta</h3>
			</header>
			<h1 className='text-[7rem] font-medium w-2/3 leading-none'>
				Take Control Of Your Tasks
			</h1>
			<div className='py-10'>
				<Button asChild>
					<Link href={'/dashboard'}>Enter Dashboard</Link>
				</Button>
			</div>
		</main>
	);
}
