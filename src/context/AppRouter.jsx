import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../Home';
import Register from '../web/pages/account/Register';
import Page404 from '../shared/Page404';
import Login from '../web/pages/account/Login';
const AppRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' });
    }, [location]);

    useEffect(() => {
        const validRoutes = [
            '/',
            '/register',
            '/login',
        ];

        // Skip validation if URL contains vnpayment parameters
        if (!location.search.includes("vnp_Amount=")) {
            const pathExists = validRoutes.some(route => {
                const regexPattern = route.replace(/:[^/]+/, '[^/]+').replace(/\/$/, '\\/?');
                const regex = new RegExp(`^${regexPattern}$`);
                return regex.test(location.pathname);
            });

            if (!pathExists && location.pathname !== '/404') {
                navigate('/404');
            }
        }
    }, [location, navigate]);


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/404' element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;