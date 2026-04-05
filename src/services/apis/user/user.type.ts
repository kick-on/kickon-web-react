import type { LeagueDto } from '../league/league.type';
import type { TeamDto } from '../team/team.type';
import type { SuccessResponse } from '../../config/dto';

// 개인정보 동의
export interface UpdatePrivacyRequest {
	privacyAgreedAt: string;
	marketingAgreedAt?: string;
}

// 유저 정보 수정
export interface UpdateUserInfoRequest {
	profileImageUrl?: string;
	nickname: string;
	teams?: number[];
	league?: number;
}

// 유저 정보 조회
export type GetUserInfoResponse = SuccessResponse<UserInfoDto>;

// 내부 DTO
export interface UserInfoDto {
	id: string;
	nickname: string;
	profileImageUrl: string;
	email: string;
	providerType: string;
	privacyAgreedAt: string;
	marketingAgreedAt: string;
	favoriteTeams: TeamDto[];
	league?: LeagueDto;
	isInfluencer?: boolean;
	canChangeTeam: boolean;
	nextAvailableChangeDate: string;
	isReporter: boolean;
}

export interface NewTokenDto {
	refreshToken: string;
	accessToken: string;
}

// 외부에서 사용하는 유저 관련 DTO
export interface UserDto {
	id: string;
	nickname: string;
	profileImageUrl: string;
	isReporter: boolean;
}

// --- 새로운 회원가입 플로우 ---

// 닉네임 중복 확인
export interface NicknameAvailableResponse {
	available: boolean;
}

export type GetNicknameAvailableResponse = SuccessResponse<NicknameAvailableResponse>;

// 회원가입 request
export interface SignupDeviceRequest {
	nickname: string;
	deviceCredential: string;
	teams: number[];
	profileImageUrl?: string;
	privacyAgreedAt: string;
	marketingAgreedAt?: string;
}

export interface SignupDeviceResponse {
	token: {
		accessToken: string;
		refreshToken: string;
	};
	signupCompleted: boolean;
}
export type PostSignupDeviceResponse = SuccessResponse<SignupDeviceResponse>;

export interface LoginDeviceRequest {
	nickname: string;
	deviceCredential: string;
}

export type GetLoginDeviceResponse = SuccessResponse<SignupDeviceResponse>;
