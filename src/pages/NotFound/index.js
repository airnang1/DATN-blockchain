import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../../Components/Helmet';

export default function NotFound() {
    return (
        <Helmet title="NotFound">
            <div className="not-found">
                <h1 className="not-found__error-number">404</h1>
                <p className="not-found__title">Oops! Something is wrong.</p>
                <Link to="/home">
                    <button className="not-found__btn" href="true">
                        <i className="far fa-home"></i> Go back in initial page,
                        is better.
                    </button>
                </Link>
            </div>
        </Helmet>
    );
}
