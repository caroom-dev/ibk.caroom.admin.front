import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { startAppLoadingAction, endAppLoadingAction } from '@Store/App';

function loadingReducer(state: any, action: any) {
    switch (action.type) {
        case 'FETCH':
            return { state: true, message: null, error: false };
        case 'ERROR':
            return { state: false, message: action.message, error: true };
        case 'SUCCESS':
            return { state: false, message: null, error: false };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default function useLoading() {
    const [loadingState, loadingDispatch] = useReducer(loadingReducer, { state: false, message: null, error: false });
    const dispatch = useDispatch();

    const loadingControl = async (state: { type: 'fetch' | 'success' | 'error'; message?: string }) => {
        if (state.type === 'fetch') {
            dispatch(startAppLoadingAction());
            loadingDispatch({ type: 'FETCH' });
        } else if (state.type === 'error') {
            dispatch(endAppLoadingAction());
            loadingDispatch({ type: 'ERROR', message: state.message });
        } else if (state.type === 'success') {
            loadingDispatch({ type: 'SUCCESS' });
            dispatch(endAppLoadingAction());
        }
    };

    return { loadingState, loadingControl };
}
