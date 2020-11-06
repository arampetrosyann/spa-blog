import React from "react";
import styles from "./Message.module.css";
import PropTypes from "prop-types";

export default function Message({ text }) {
  return (
    <div className={styles.message}>
      <span className={styles.emoji} role="img" aria-label="cross mark">
        &#10060;
      </span>
      {text}
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
