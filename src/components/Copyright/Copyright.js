import React from "react";
import PropTypes from "prop-types";

export default function Copyright({ color, text }) {
  return <small style={{ color }}>&copy; {text}</small>;
}

Copyright.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};
