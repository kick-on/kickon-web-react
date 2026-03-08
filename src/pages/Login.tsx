import LoginContent from '@/components/common/login-modal/login-content';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();
	const previousPage = sessionStorage.getItem('previousPage') || '/';

	return <LoginContent onClose={() => navigate(previousPage, { replace: true })} />;
}
