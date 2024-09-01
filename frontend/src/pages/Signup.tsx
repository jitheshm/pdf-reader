import React, { useEffect, useState } from 'react';
import SignupComponent from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Signup() {
    const [loading, setLoading] = useState(true);
    const { status } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (status) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [status, navigate]);

    return (
        <>
            {
                loading ?
                    <p>Loading...</p> :
                    <SignupComponent />
            }
        </>
    );
}

export default Signup;
