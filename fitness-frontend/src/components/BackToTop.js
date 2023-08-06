import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        setIsVisible(scrollTop > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    return (
        <button
            id="no-shadow"
            className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}>
                <img src={process.env.PUBLIC_URL + '/images/back-to-top.png'} alt="Back to top" />
            {/* <FontAwesomeIcon icon={faArrowUp} /> */}
        </button>
    );
};

export default BackToTop;