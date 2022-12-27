import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../Grid';

const footerAboutLink = [
    { display: 'Introduce', path: '/about' },
    { display: 'Contact', path: '/contact' },
    { display: 'Recruitment', path: '/recruitment' },
    { display: 'News', path: '/news' },
    { display: 'Shop System', path: '/system' },
];

const footerCustomLink = [
    { display: 'Return Policy', path: '/return-policy' },
    { display: 'Warranty Policy', path: '/warranty-policy' },
    { display: 'Refund Policy', path: '/refund-policy' },
];
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container container-footer">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                    bgr={false}
                    className="footer-item"
                >
                    <div className="footer-item">
                        <div className="footer__title">Support call center</div>
                        <div className="footer__content">
                            <p>
                                Order contact<strong>0397348149</strong>
                            </p>
                            <p>
                                Order inquiries<strong>0397348149</strong>
                            </p>
                            <p>
                                Suggestions, complaints
                                <strong>0397348149</strong>
                            </p>
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer__title">About Iphone</div>
                        <div className="footer__content">
                            {footerAboutLink.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="footer-item">
                        <div className="footer__title">Customer care</div>
                        <div className="footer__content">
                            {footerCustomLink.map((item, index) => (
                                <p key={index}>
                                    <Link to={item.path}>{item.display}</Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="footer__about footer-item">
                        <p>
                            <Link to="/">
                                <img
                                    alt=""
                                    src="https://www.gameartguppy.com/wp-content/uploads/2017/06/logo-apple.png"
                                    className="footer__logo"
                                />
                            </Link>
                        </p>
                        <p>
                            Hướng đến mục tiêu là tạo nên 1 thị trường điện tử
                            lớn nhất Việt Nam, shop Iphone cung cấp những chiếc
                            Iphone đời mới nhất, với những tiện ích mà hiếm có
                            hãng điện thoại nào sánh được. Hãy cùng Iphone hướng
                            đến 1 cuộc sống đầy đủ tiện nghi hơn.
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
}
