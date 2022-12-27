import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchActivationEmail } from '../../Store/Reducer/authReducer';
import { setLoadingAction } from '../../Store/Reducer/loadingReducer';

function ActivationEmail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { activation_token } = useParams();

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (activation_token) {
            dispatch(setLoadingAction(true));
            dispatch(fetchActivationEmail(activation_token));
        }
    }, [activation_token, dispatch]);

    useEffect(() => {
        if (user && token) {
            history.push('/');
            setTimeout(() => {
                dispatch(setLoadingAction(false));
            }, 500);
        }
    }, [dispatch, history, user, token]);

    return <div></div>;
}

ActivationEmail.propTypes = {};

export default ActivationEmail;
