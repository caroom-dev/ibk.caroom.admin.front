import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '@Store/Auths';
import { RootState } from 'StoreTypes';
import _Alert_ from '@_Alert_';

export default function Logout() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { authsLoginState } = useSelector((store: RootState) => ({
        authsLoginState: store.auths.login.state,
    }));

    useEffect(() => {
        dispatch(logoutAction());
    }, []);

    useEffect(() => {
        if (authsLoginState === 'idle') {
            _Alert_.defaultInfo({ text: '로그아웃 되었습니다.' });
            history.push({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            });
        }
    }, [authsLoginState]);

    return <>Logout</>;
}
