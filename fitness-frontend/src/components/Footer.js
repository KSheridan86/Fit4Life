import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white text-center py-3">
            <div className="container">
                <div className="social-icons d-flex justify-content-between">
                    <a
                        href="http://instagram.com/nasahubble/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-4"
                    >
                        <i className="fab fa-instagram fa-lg"></i>
                    </a>
                    <a
                        href="http://youtube.com/channel/UCqvjEkH_41m4DYaoNQwk4Bw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-4"
                    >
                        <i className="fab fa-youtube fa-lg"></i>
                    </a>
                    <a
                        href="http://facebook.com/NASAHubble/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-4"
                    >
                        <i className="fab fa-facebook fa-lg"></i>
                    </a>
                    <a
                        href="http://twitter.com/nasahubble"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-4"
                    >
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>
                </div>
                <div className="mt-2">
                <a href="https://www.chimptech.ie" target="_blank" rel="noreferrer"
                    aria-label="link to web design business that built site">
                    Designed & Built by ChimpTech Web Design
                </a>
                <div className="mt-2">© 2023 - All rights reserved</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;