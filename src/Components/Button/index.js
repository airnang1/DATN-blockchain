import React from 'react';
import PropTypes from 'prop-types';
function Button(props) {
    const { bgBtn, size, icon, animate, onclick, children, width } = props;
    const bg = bgBtn ? `bg-${bgBtn}` : 'bg-main';
    const sz = size ? `btn-${size}` : '';
    const anmt = animate ? 'btn-animate' : '';

    return (
        <button
            className={`btn ${bg} ${sz} ${anmt}`}
            onClick={onclick ? () => onclick() : null}
            style={{ width: width }}
        >
            <span className="btn__txt">{children}</span>
            {icon ? (
                <span className="btn__icon">
                    <i className={`fas fa-${icon} move`}></i>
                </span>
            ) : null}
        </button>
    );
}

Button.propTypes = {
    bgBtn: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func,
};

export default Button;
