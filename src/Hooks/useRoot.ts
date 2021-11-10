import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORLOG } from '@Helper';
import { appInitAction } from '@Store/App';
import { checkLocalTokenAction } from '@Store/Auths';
import { RootState } from 'StoreTypes';
import _Alert_ from '@_Alert_';

export default function useRoot() {
    const dispatch = useDispatch();
    const { appLoading, appStatus, appErrorMessage } = useSelector((store: RootState) => ({
        appLoading: store.app.loading,
        appStatus: store.app.status,
        appErrorMessage: store.app.service_message,
    }));

    // 체크 상태.
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false);

    // 최초 로딩시 앱 초기화.
    useEffect(() => {
        const appStart = async () => {
            COLORLOG(':: App Init Start :: ', 'info');
            dispatch(appInitAction());
        };
        appStart();
    }, []);

    useEffect(() => {
        // 로딩이 끝나고 상태가 정상이면.
        if (appLoading === false && appStatus === true) {
            COLORLOG(':: App Init Success :: ', 'success');
            setAppBaseCheckState(true);
            dispatch(checkLocalTokenAction());
        } else if (appStatus === false) {
            // 상태가 false 일떄.
            if (appErrorMessage) {
                _Alert_.default({ text: appErrorMessage });
            }
        }
    }, [appLoading, appStatus]);

    return {
        AppBaseCheckState,
    };
}
