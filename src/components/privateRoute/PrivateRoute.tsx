import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/app/hooks";
import { PrivateRouteProps } from "./types";

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = useAppSelector(state => state.auth);
    const location = useLocation();

    return auth.token && auth.admin ? children :
        <Navigate
            to="/admin-login"
            state={{ from: location }}
            replace
        />;
}
