import useAuthStore from '@/lib/store/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthFinalize() {
	const [searchParams] = useSearchParams();
	const errorCode = searchParams.get('errorCode');
	const navigate = useNavigate();

	const { getToken } = useAuthStore();

	useEffect(() => {
		const previousPage = sessionStorage.getItem('previousPage') || '/';

		if (!errorCode) {
			// 에러 코드가 없으면 access token을 zustand에 저장
			getToken();
		} else if (errorCode === 'REJOIN_LIMIT') {
			alert('탈퇴 후 7일이 지나지 않아 재가입할 수 없습니다.');
		} else {
			alert('알 수 없는 오류가 발생했습니다.');
		}

		// 이전 페이지로 이동
		navigate(previousPage, { replace: true });
	}, [errorCode, navigate, getToken]);

	return <></>;
}
