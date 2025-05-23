import { useAppSelector } from '../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';

const Protected: React.FC<{
	onlyUnAuth: boolean;
	component: React.ReactNode;
}> = ({ onlyUnAuth, component }) => {
	const isAuthChecked = useAppSelector((store) => store.auth.isAuthChecked);
	const user = useAppSelector((store) => store.auth.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return null;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}
	return component;
};

export const OnlyAuth = ({ component }: { component: React.ReactNode }) => (
	<Protected onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth = ({ component }: { component: React.ReactNode }) => (
	<Protected onlyUnAuth={true} component={component} />
);
