'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { RefreshCcw } from 'lucide-react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AvatarComponent from './AvatarComponent';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

export default function DashboardHeader() {
	const [open, setOpen] = useState(false);
	const { setLocalUser, getLocalUser } = useLocalStorage('localuser');
	const [user, setUser] = useState({
		id: '',
		name: '',
		avatar: '',
	});

	const createLocalUser = () => {
		const userId = nanoid();
		const newUser = {
			id: userId,
			name: '',
			avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${userId}`,
		};
		setLocalUser(JSON.stringify(newUser));
		setOpen(true);
	};
	const updateLocalUser = () => {
		const newUser = {
			id: user.id,
			name: user.name,
			avatar: user.avatar,
		};
		setLocalUser(JSON.stringify(newUser));
		setOpen(false);
	};
	const updateAvatar = () => {
		const avatarId = nanoid();
		const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${avatarId}`;

		setUser((prev) => ({ ...prev, avatar: avatarUrl }));
	};
	useEffect(() => {
		try {
			const localUser = getLocalUser();
			if (!localUser) {
				// console.log('no user exists');

				createLocalUser();
			} else {
				// console.log(localUser);
				setUser(JSON.parse(localUser));
			}
		} catch (e) {
			console.log('Cant get local user', e);
		}
	}, []);
	return (
		<div className='flex justify-between lg:px-14 px-5 py-5'>
			<p className='font-semibold text-xl blur-[0.2px]'>
				<Link href={'/'}>Quanta</Link>
			</p>

			<div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<AvatarComponent
							image={user.avatar}
							fallback={user.name ? user.name[0] : 'U'}
						/>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Profile</DialogTitle>
							<div className='grid justify-center space-y-5'>
								<div className='relative flex items-center justify-center'>
									<AvatarComponent
										image={user.avatar}
										fallback={user.name ? user.name[0] : 'U'}
									/>
									<RefreshCcw
										className='size-4 absolute -bottom-2 left-1/2 cursor-pointer'
										onClick={() => updateAvatar()}
									/>
								</div>
								<div className='grid w-full max-w-sm items-center gap-1.5'>
									<Label htmlFor='id'>User ID:</Label>
									<Input
										id='id'
										type='text'
										disabled
										value={user.id}
										onChange={() => {}}
									/>
								</div>
								<div className='grid w-full max-w-sm items-center gap-1.5'>
									<Label htmlFor='name'>Name:</Label>
									<Input
										id='name'
										type='text'
										value={user.name}
										onChange={(e) =>
											setUser((prev) => ({ ...prev, name: e.target.value }))
										}
									/>
								</div>
								<Button onClick={() => updateLocalUser()}>Update</Button>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
