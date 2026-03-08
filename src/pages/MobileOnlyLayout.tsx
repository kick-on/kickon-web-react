import MobileGate from '@/components/layouts/mobile-only/mobile-gate';
import { Outlet } from "react-router-dom";

export default function MobileOnlyLayout() {
	return (
		<MobileGate>
			<Outlet />
		</MobileGate>
	);
}
