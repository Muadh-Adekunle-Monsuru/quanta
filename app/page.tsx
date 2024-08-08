'use client';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	const { RiveComponent, rive } = useRive({
		src: '/background.riv',
		stateMachines: 'State Machine 1',
		artboard: 'Artboard',
		layout: new Layout({
			fit: Fit.FitHeight, // Change to: rive.Fit.Contain, or Cover
			alignment: Alignment.Center,
		}),
		autoplay: true,
	});
	return (
		<main className='flex min-h-screen flex-col  text-white bg-[#191134]'>
			<header className='flex  items-center bg-transparent fixed top-0 w-full backdrop-blur-md p-5 justify-between'>
				<div className='flex items-center gap-4'>
					<div className='size-10 rounded-full flex items-center justify-center'>
						<Image
							src='/logo.svg'
							alt='logo'
							width={50}
							height={50}
							className=' object-contain'
						/>
					</div>
					<h3 className='font-semibold text-2xl select-none cursor-pointer'>
						Quanta
					</h3>
				</div>
				<Link href={'/dashboard'}>
					<h1 className='hover:underline underline-offset-8'>Dashboard</h1>
				</Link>
			</header>
			<div className='h-screen w-full'>
				<h1 className='text-7xl md:hidden font-extrabold text-center fixed top-1/3 w-full px-5'>
					Take Control Of Your
					<span className='block md:hidden'>Tasks</span>
					<span className='text-xs font-mono uppercase'>
						Works Best On a Desktop
					</span>
				</h1>
				<div className='h-screen w-full opacity-0 md:opacity-100'>
					<RiveComponent className='' />
				</div>
			</div>
		</main>
	);
}
