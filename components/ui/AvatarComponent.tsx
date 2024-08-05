import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AvatarComponent({
	image,
	fallback = 'U',
}: {
	image: string;
	fallback?: string;
}) {
	return (
		<Avatar>
			<AvatarImage src={image} />
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
}
