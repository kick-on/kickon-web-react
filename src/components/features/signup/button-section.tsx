import BottomButton from '@/components/common/bottom-button';
import useAuthStore from '@/lib/store/useAuthStore';
import { checkNicknameAvailable, signupWithDevice } from '@/services/apis/user/user.api';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";

export default function ButtonSection({
	nickname,
	teams,
	isDuplicated,
	setIsDuplicated,
	agreements,
	deviceCredential,
}) {
	const setToken = useAuthStore((state) => state.setToken);
	const navigate = useNavigate();

	const isValidNickname = nickname && !isDuplicated;
	const isAllRequiredChecked = agreements.age && agreements.term && agreements.privacy;
	const isButtonDisabled = !(isValidNickname && isAllRequiredChecked && teams);

	// const handleSignupButtonClick = async () => {
	// 	// 유저 정보 수정(저장) -> 약관 동의 -> 재로그인
	// 	callUpdateUserInfo();
	// };

	// const callUpdateUserInfo = async () => {
	// 	const updateUserInfoRequest: UpdateUserInfoRequest = {
	// 		nickname: nickname,
	// 		teams: teams,
	// 	};

	// 	try {
	// 		await updateUserInfo(updateUserInfoRequest);
	// 		callUpdatePrivacy(); // 회원 정보 수정 성공 -> 약관 동의
	// 	} catch (error) {
	// 		if (error.errorData.code === 'DUPLICATED_NICKNAME') {
	// 			setIsDuplicated(true);
	// 		} else {
	// 			alert(error.message);
	// 			setIsDuplicated(false);
	// 		}
	// 	}
	// };

	// const callUpdatePrivacy = async () => {
	// 	const privacyRequest: UpdatePrivacyRequest = {
	// 		privacyAgreedAt: agreements.privacy && new Date().toISOString().split('.')[0] + 'Z',
	// 		marketingAgreedAt: agreements.marketing ? new Date().toISOString().split('.')[0] + 'Z' : undefined,
	// 	};

	// 	try {
	// 		await updatePrivacy(privacyRequest);
	// 		reLogin(); // 약관 동의 성공 -> 재로그인(권한 업데이트)
	// 	} catch (error) {
	// 		alert(error.message);
	// 	}
	// };

	// const reLogin = () => {
	// 	const redirectUrl = `${DOMAIN_URL || 'http://localhost:3000'}/auth/callback/${provider}`;
	// 	window.location.href = `${SERVER_URL}/oauth2/authorization/${provider}?state=${redirectUrl}`;
	// };

	const handleSignupButtonClick = async () => {
		if (!nickname) return;

		try {
			// 1. 닉네임 중복 확인 (마지막으로 한 번 더 검증)
			const availability = await checkNicknameAvailable(nickname);

			if (!availability.data.available) {
				setIsDuplicated(true);
				alert('이미 사용 중인 닉네임입니다.');
				return;
			}

			// 2. 닉네임 사용 가능 시 회원가입 진행
			await callSignupWithDevice();
		} catch (error: any) {
			alert(error.message || '인증 과정에서 오류가 발생했습니다.');
		}
	};

	const callSignupWithDevice = async () => {
		if (!deviceCredential || !nickname || !teams) return;

		const signupRequest = {
			nickname: nickname,
			deviceCredential: deviceCredential,
			teams: teams,
			// 명세의 포맷(Z)에 맞춰 전송
			privacyAgreedAt: new Date().toISOString().split('.')[0] + 'Z',
			marketingAgreedAt: agreements.marketing ? new Date().toISOString().split('.')[0] + 'Z' : undefined,
		};

		try {
			console.log('회원가입 request:', signupRequest);
			const response = await signupWithDevice(signupRequest);

			if (response.data.signupCompleted) {
				// 회원가입 성공 시 메인으로 이동
				const { accessToken } = response.data.token;
				setToken(accessToken);
				localStorage.setItem('nickname', nickname);

				alert('회원가입이 완료되었습니다.');
				navigate('/', { replace: true });
			}
		} catch (error: any) {
			if (error.errorData?.code === 'DUPLICATED_NICKNAME') {
				setIsDuplicated(true);
				alert('중복된 닉네임입니다.');
			} else {
				alert(error.message || '회원가입에 실패했습니다.');
			}
		}
	};

	const buttons = [
		{
			text: '회원가입',
			onClick: handleSignupButtonClick,
			disabled: isButtonDisabled,
		},
	];

	return (
		<div className="mt-20">
			<BottomButton buttons={buttons} />
		</div>
	);
}
