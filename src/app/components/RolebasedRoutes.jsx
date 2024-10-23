'use client';
import { useRouter } from 'next/navigation';

const RoleBasedRoute = ({ accessKeys, children, path }) => {
    const router = useRouter();
    let role = "";

    if (typeof window !== "undefined") {
        role = JSON.parse(localStorage.getItem('accessRoute'));
    }

    const hasAccess = accessKeys.some(accessKey => role?.includes(accessKey));

    if (!hasAccess) {
        router.push('/not-found');
        return null;
    }

    return children;
};

export default RoleBasedRoute;
