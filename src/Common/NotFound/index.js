import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function NotFoundLayout(props) {
    const { name, component: YourComponent, path } = props;
    return (
        <Route
            name={name}
            path={path}
            render={(props) => <YourComponent {...props} />}
        />
    );
}

NotFoundLayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
    path: PropTypes.string,
};
