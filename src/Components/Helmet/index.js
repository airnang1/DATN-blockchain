import React from "react";
import PropTypes from "prop-types";

function Helmet(props) {
  const { title, children } = props;
  document.title = "Shop Iphone - " + title;

  return <div className="helmet">{children}</div>;
}

Helmet.propTypes = {
  title: PropTypes.string.isRequired,
};

Helmet.defaultProps = {
  title: "Iphone",
};

export default Helmet;
