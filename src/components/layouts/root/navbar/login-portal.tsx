import LoginModal from '@/components/common/login-modal/login-modal';
import { useIsLoginModalOpenStore } from '@/lib/store/useIsLoginModalOpenStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPortal() {
	const previousPage = typeof window !== 'undefined' ? sessionStorage.getItem('previousPage') : null;
	const navigate = useNavigate();

	const { isLoginModalOpen, closeLoginModal } = useIsLoginModalOpenStore();

	const handleLoginModalClose = () => {
		closeLoginModal();
		if (previousPage === '/') {
			navigate(previousPage);
		}
	};

	return isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />;
}
