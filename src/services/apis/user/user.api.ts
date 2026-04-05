import type {
	GetLoginDeviceResponse,
	GetNicknameAvailableResponse,
	GetUserInfoResponse,
	LoginDeviceRequest,
	PostSignupDeviceResponse,
	SignupDeviceRequest,
	UpdatePrivacyRequest,
	UpdateUserInfoRequest,
} from './user.type';
import type { EmptySuccessResponse } from '../../config/dto';
import { fetcher } from '@/lib/server/fetcher';

// 개인정보 동의 업데이트
export const updatePrivacy = async (body: UpdatePrivacyRequest) => {
	const response = await fetcher<EmptySuccessResponse>({
		method: 'PATCH',
		url: '/api/user/privacy',
		body,
	});

	return response;
};

// 유저 정보 수정
export const updateUserInfo = async (body: UpdateUserInfoRequest) => {
	const response = await fetcher<EmptySuccessResponse>({
		method: 'PATCH',
		url: '/api/user',
		body,
	});

	return response;
};

// 유저 정보 조회
export const getUserInfo = async () => {
	const response = await fetcher<GetUserInfoResponse>({ method: 'GET', url: '/api/user/me' });
	return response;
};

// 회원 탈퇴
export const deleteUserMe = async (body: { reason: string }) => {
	const response = await fetcher<EmptySuccessResponse>({
		method: 'DELETE',
		url: '/api/user/me',
		body,
	});

	return response;
};

// --- 새로운 회원가입 플로우 ---

// 닉네임 중복 api
export const checkNicknameAvailable = async (nickname: string) => {
	const response = await fetcher<GetNicknameAvailableResponse>({
		method: 'GET',
		url: `/auth/nickname/available?nickname=${encodeURIComponent(nickname)}`,
	});

	return response;
};

// 디바이스 회원가입 api
export const signupWithDevice = async (body: SignupDeviceRequest) => {
	const response = await fetcher<PostSignupDeviceResponse>({
		method: 'POST',
		url: '/auth/signup/device',
		body,
	});

	return response;
};

// 디바이스 로그인 api
export const loginWithDevice = async (body: LoginDeviceRequest) => {
	return await fetcher<GetLoginDeviceResponse>({
		method: 'POST',
		url: '/auth/login/device',
		body,
	});
};
