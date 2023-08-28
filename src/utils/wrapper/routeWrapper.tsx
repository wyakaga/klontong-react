import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

type PrivateRouteProps = {
	children: ReactNode;
};

type IsLoginProps = {
	children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
	const navigate = useNavigate();

	const token = useSelector((state: RootState) => state.auth.token);

	useEffect(() => {
		if (!token) navigate("/login", { replace: true });
	}, [navigate, token]);

	return <>{children}</>;
};

export function IsLogin({ children }: IsLoginProps): JSX.Element {
	const navigate = useNavigate();

	const token = useSelector((state: RootState) => state.auth.token);

	useEffect(() => {
		if (token) navigate("/", { replace: true });
	}, [navigate, token]);

	return <>{children}</>;
}
