import { setCookie } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function AccountManagementSection() {
	const navigate = useNavigate();

	//const { currentUserInfo } = useCurrentUserInfoStore();
	//const socialLogoUrl = currentUserInfo?.providerType === 'KAKAO' ? '/sns/kakao-small.svg' : '/sns/naver-small.svg';

	return (
		<div className="relative flex flex-col gap-2">
			{/* <div className="flex gap-1.5 items-center subtitle1-semibold">
        계정 관리
      </div>
      <div
        className="flex gap-2.5 items-center px-4 py-3 w-full @mobile:text-body-05
					border border-black-300 rounded-lg bg-black-100 text-body-03"
      >
        <img width={18} height={18} src={socialLogoUrl} alt="" />
        {currentUserInfo?.email}
      </div> */}

			<button
				onClick={() => {
					navigate('/withdrawal');
					setCookie('fromProfile', 'true', 60);
				}}
				className="absolute -bottom-8 right-0 text-black-500 text-button-05 font-regular underline"
			>
				회원 탈퇴
			</button>
		</div>
	);
}
