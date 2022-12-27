import React from 'react';

function EmptyComponent(props) {
    return <div className="empty-component">{props.children}</div>;
}

EmptyComponent.propTypes = {};

export default EmptyComponent;
