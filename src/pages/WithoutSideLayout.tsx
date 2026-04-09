import WhiteBox from '@/components/layouts/without-side/white-box';
import { Suspense } from 'react';
import { Outlet } from "react-router-dom";

export default function WithoutSideLayout() {
	return (
		<WhiteBox>
			<Suspense>
				<Outlet />
			</Suspense>
		</WhiteBox>
	);
}
