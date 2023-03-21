import MainDesign from '../components/ui/MainDesign';
import CartIndicator from '../components/cartIndicator/CartIndicator';
import cssClass from './StaticPage.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StaticPage = () => {
    const [showIndicator, setShowIndicator] = useState(true);
    const [componentCSS, setComponentCSS] = useState(`${cssClass.staticPage}`)
    const location = useLocation();

    const { pathname } = location;

    useEffect(() => {
        const pathObjects = pathname.split('/');
        const lastPathObject = pathObjects[pathObjects.length - 1];
       
        if (lastPathObject === 'eshop' || /^(\d+)$/.test(lastPathObject)) {
            setShowIndicator(true);
            setComponentCSS(`${cssClass.staticPage} ${cssClass.paddingWithIndicator}`);
        } else {
            setShowIndicator(false);
            setComponentCSS(`${cssClass.staticPage} ${cssClass.paddingWithout}`);
        }
    }, [pathname]);

    return (
        <div className={componentCSS}>
            {showIndicator && <CartIndicator />}
            <MainDesign>
                <Outlet />
            </MainDesign>
        </div>
    );
}

export default StaticPage;