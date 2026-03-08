import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { setCookie } from '@/lib/utils';
import { getUserInfo } from '@/services/apis/user/user.api';

export default function AuthCallback() {
	const { provider } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const handleCallback = async () => {
			const accessToken = searchParams.get('accessToken');
			const refreshToken = searchParams.get('refreshToken');
			const errorCode = searchParams.get('errorCode');

			if (errorCode === 'FORBIDDEN_RESISTER') {
				navigate(`/auth/finalize?errorCode=REJOIN_LIMIT`, { replace: true });
				return;
			}

			if (!accessToken || !refreshToken) {
				navigate(`/auth/finalize?errorCode=UNKNOWN`, { replace: true });
				return;
			}

			// 토큰을 쿠키에 저장
			setCookie('accessToken', accessToken, 60 * 60); // 1시간
			setCookie('refreshToken', refreshToken, 60 * 60 * 24 * 30); // 30일

			try {
				// 유저 정보 확인 (회원가입 여부 판단)
				const response = await getUserInfo();
				const isSignedUp = !!response.data.privacyAgreedAt;

				if (isSignedUp) {
					// 가입된 유저 -> finalize로 이동하여 로그인 마무리
					navigate('/auth/finalize', { replace: true });
				} else {
					// 미가입 유저 -> 회원가입 페이지로 이동
					setCookie('fromLogin', 'true', 60);
					navigate(`/signup?provider=${provider}`, { replace: true });
				}
			} catch (error) {
				console.error('Auth callback error:', error);
				// 401/403 에러인 경우도 회원가입으로 간주 (next 로직 참고)
				if ((error as any).statusCode === 401 || (error as any).statusCode === 403) {
					setCookie('fromLogin', 'true', 60);
					navigate(`/signup?provider=${provider}`, { replace: true });
				} else {
					navigate(`/auth/finalize?errorCode=UNKNOWN`, { replace: true });
				}
			}
		};

		handleCallback();
	}, [provider, searchParams, navigate]);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
		</div>
	);
}
