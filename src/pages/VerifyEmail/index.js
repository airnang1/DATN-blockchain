import React from 'react';

function VerifyEmail() {
    
    return (
        <div className="active_page">
            <aside>
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
                    alt=""
                />
            </aside>
            <main className="active_page__title">
                <h1>Hello!</h1>
                <p>
                    Hãy đăng nhập vào địa chỉ https://mail.google.com/mail/ để
                    xác nhận email của bạn !
                </p>
            </main>
        </div>
    );
}

VerifyEmail.propTypes = {};

export default VerifyEmail;
