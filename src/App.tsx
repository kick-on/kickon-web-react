import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { DeviceInitializer } from './components/layouts/device-initializer';

function App() {
	return (
		<DeviceInitializer>
			<RouterProvider router={router} />
		</DeviceInitializer>
	);
}

export default App;
