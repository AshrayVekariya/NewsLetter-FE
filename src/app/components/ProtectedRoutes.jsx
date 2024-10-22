'use client'
import React, { useEffect, useState } from 'react';

// Next JS Hooks and Components
import { useRouter } from 'next/navigation';

// Components
import LayoutComponent from '../../layout/Layout';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(JSON.parse(window.localstorage.getItem('accessToken')) || "");

    useEffect(() => {
        if (!isLogin) {
            router.push('/login');
        }
    }, [isLogin, router]);

    return isLogin ? <LayoutComponent>{children}</LayoutComponent> : null;
};

export default ProtectedRoute;
