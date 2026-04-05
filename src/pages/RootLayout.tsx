import { Outlet } from 'react-router-dom';
import Footer from '@/components/layouts/root/footer';
import MinWidth from '@/components/layouts/root/min-width';
import LoginPortal from '@/components/layouts/root/navbar/login-portal';
import MarginWrapper from '@/components/layouts/root/margin-wrapper';
import ReactQueryProvider from '@/lib/provider/react-query-provider';
import MobileNavbar from '@/components/layouts/root/mobile-navbar';
import AuthInitializer from '@/components/layouts/auth-initializer';

export default function RootLayout() {
	return (
		<div className="antialiased font-pretendard">
			{/*<NotificationInitializer />*/}
			<AuthInitializer>
				<div className="@container relative h-dvh overflow-y-scroll flex flex-col">
					<ReactQueryProvider>
						<MobileNavbar />
						<LoginPortal />
						<MarginWrapper>
							<Outlet />
							<MinWidth />
						</MarginWrapper>
					</ReactQueryProvider>
					<Footer />
				</div>
			</AuthInitializer>
		</div>
	);
}
