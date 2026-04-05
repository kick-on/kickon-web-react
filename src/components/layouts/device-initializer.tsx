import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DEVICE_CREDENTIAL_KEY = 'device_credential';

export const DeviceInitializer = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		// 기존에 저장된 값이 있는지 확인
		const savedCredential = localStorage.getItem(DEVICE_CREDENTIAL_KEY);

		if (!savedCredential) {
			// 없다면 새로 생성 (회원가입 시 서버에 보낼 값)
			const newCredential = uuidv4();
			localStorage.setItem(DEVICE_CREDENTIAL_KEY, newCredential);
			console.log('Device Credential Initialized:', newCredential);
		}
	}, []);

	return <>{children}</>;
};
