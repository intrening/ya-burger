import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TStore } from '@services/types';

const Protected = ({
	onlyUnAuth = false,
	component,
}: {
	onlyUnAuth: boolean;
	component: React.ReactNode;
}) => {
	const isAuthChecked = useSelector(
		(store: TStore) => store.auth.isAuthChecked
	);
	const user = useSelector((store: TStore) => store.auth.user);
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
