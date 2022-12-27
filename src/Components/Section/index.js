import React from 'react';

const Section = (props) => {
    const { children } = props;
    return <div className="section">{children}</div>;
};

export const SectionTitle = (props) => {
    const { children } = props;
    return (
        <div className="section__title">
            {/* <i className={`fas fa-stars`}></i> */}
            <i className="fad fa-crown"></i>
            {children}
        </div>
    );
};

export const SectionBody = (props) => {
    const { children } = props;
    return <div className="section__body">{children}</div>;
};
export default Section;
