'use client'
import React, { useEffect, useState } from 'react';

// Next JS Hooks and Components
import { useRouter } from 'next/navigation';

// Components
import LayoutComponent from '../../layout/Layout';

const ProtectedRoute = ({ children }) => {
    // const router = useRouter();
    // const [isLogin, setIsLogin] = useState('');

    // useEffect(() => {
    //     if (!isLogin) {
    //         router.push('/login');
    //     }
    // }, [isLogin]);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setIsLogin(JSON.parse(localStorage.getItem('accessToken')) || "")
    //     }
    // }, [])


    return true ? <LayoutComponent>{children}</LayoutComponent> : null;
};

export default ProtectedRoute;
