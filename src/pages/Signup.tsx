import Checkbox from '@/components/features/signup/checkbox';
import { useState } from 'react';
import Nickname from '@/components/common/account/nickname';
import { agreementDatas } from '@/lib/constants/agreementDatas';
import { useSearchParams } from 'react-router-dom';
// import { getCookie, setCookie } from '@/lib/utils';
import FavoriteTeamSection from '@/components/common/account/favorite-team-section';
import ButtonSection from '@/components/features/signup/button-section';

export default function Signup() {
	//const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const provider = searchParams.get('provider');
	//const socialLogoUrl = provider === 'naver' ? '/sns/naver-small.svg' : '/sns/kakao-small.svg';
	//const socialLogoAlt = provider === 'naver' ? '네이버' : '카카오';

	const [isDuplicated, setIsDuplicated] = useState(false);
	const [nickname, setNickname] = useState<string | null>(null);
	const [teams, setTeams] = useState<number[] | null>(null);
	const [agreements, setAgreements] = useState({
		all: false,
		age: false,
		term: false,
		privacy: false,
		marketing: false,
	});

	const deviceCredential = localStorage.getItem('device_credential');

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
		if (isDuplicated) {
			setIsDuplicated(false);
		}
	};

	const handleCheckboxChange = (key: string) => {
		const prev = agreements[key as keyof typeof agreements];

		if (key === 'all') {
			setAgreements({
				all: !prev,
				age: !prev,
				term: !prev,
				privacy: !prev,
				marketing: !prev,
			});
		} else {
			const updated = { ...agreements, [key]: !prev };
			updated.all = updated.age && updated.term && updated.privacy && updated.marketing;
			setAgreements(updated);
		}
	};

	// 소셜 로그인을 통한 접근이 아닌 경우 홈으로 리디렉션
	// const [isValidAccess, setIsValidAccess] = useState(false);

	// useEffect(() => {
	// 	const fromLogin = getCookie('fromLogin');

	// 	if (fromLogin === 'true') {
	// 		setIsValidAccess(true);
	// 	} else {
	// 		alert('잘못된 접근입니다.');
	// 		navigate('/', { replace: true });
	// 	}
	// }, [navigate]);

	// useEffect(() => {
	// 	return () => {
	// 		if (isValidAccess) {
	// 			setCookie('fromLogin', '', 0);
	// 		}
	// 	};
	// }, [isValidAccess]);

	const buttonSectionProps = {
		provider,
		nickname,
		teams,
		isDuplicated,
		setIsDuplicated,
		agreements,
		deviceCredential,
	};

	return (
		<div className="w-[21.5rem] m-auto flex flex-col items-center">
			<div className="mb-8 @mobile:mb-4 text-title-01 font-bold @mobile:text-title-02">회원가입</div>
			{/* <div className="flex gap-2">
				<img width={24} height={24} src={socialLogoUrl} alt={socialLogoAlt} />
				<div className="text-body-03 @mobile:text-body-05">계정으로 가입을 진행하고 있어요.</div>
			</div> */}

			<div className="mt-[4.75rem] @mobile:mt-[3.125rem] mb-[4.5rem] w-full flex flex-col gap-[3.125rem] @mobile:gap-10">
				<Nickname nickname={nickname} isDuplicated={isDuplicated} onChange={handleNicknameChange} />
				<FavoriteTeamSection type="signup" setTeams={setTeams} />
			</div>

			<div className="p-2.5 w-full flex flex-col gap-4">
				{agreementDatas.map(({ key, content, hasTerm, documentUrl }) => (
					<Checkbox
						key={key}
						content={content}
						hasTerm={hasTerm}
						documentUrl={documentUrl}
						checked={agreements[key as keyof typeof agreements]}
						onChange={() => handleCheckboxChange(key)}
					/>
				))}

				<ButtonSection {...buttonSectionProps} />
			</div>
		</div>
	);
}
