import React from "react";
import PropTypes from "prop-types";
import { useScreenWidth } from "../Responsive/Responsive";
// props of general jsx component of span element
import { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  textSize: [number, number, number];
}

const Text = ({ textSize, children, style, ...props }: TextProps) => {
  const screenWidth = useScreenWidth();
  const [min, current, max] = textSize;
  const vw = (current / screenWidth) * 100;
  const fontSize = `clamp(${min}px, ${vw}vw, ${max}px)`;

  return (
    <span {...props} style={{ fontSize, ...style }}>
      {children}
    </span>
  );
};

Text.propTypes = {
  textSize: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired,
};

export default Text;
