import React from 'react';
import PropTypes from 'prop-types';

function Banner(props) {
    const { image, name } = props;
    return (
        <div className="banner">
            <img alt={name} src={image} className="banner-image" />
        </div>
    );
}

Banner.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Banner;
