import DashboardHeader from '@/components/ui/DashboardHeader';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className=' flex flex-col min-h-screen w-full'>
			<DashboardHeader />
			{children}
		</main>
	);
}
