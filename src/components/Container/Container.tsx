import PropTypes from "prop-types";
import { useScreenWidth } from "../Responsive/Responsive";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  height: [number, number | "full" | "auto", number | "full" | "auto"];
  width: [number, number | "full" | "auto", number | "full" | "auto"];
  doNotResizeHeight?: boolean;
  doNotResizeWidth?: boolean;
}

const getSizeStyle = (
  minSize: number | undefined,
  currentSize: number | string,
  maxSize: number | string | undefined,
  screenSize: number,
  doNotResize: boolean
) => {
  if (doNotResize) {
    if (currentSize === "auto" || currentSize === "full") {
      return currentSize === "full" ? "100%" : "auto";
    }
    return `${currentSize}px`;
  }

  if (typeof currentSize === "number") {
    const sizeVw = (currentSize / screenSize) * 100;
    const maxSizeValue =
      maxSize === "auto" ? "auto" : maxSize === "full" ? "100%" : `${maxSize}px`;

    return `clamp(${minSize}px, ${sizeVw}vw, ${maxSizeValue})`;
  }

  return currentSize;
};

const Container = ({
  height,
  width,
  doNotResizeHeight = false,
  doNotResizeWidth = false,
  style,
  children,
  ...props
}: ContainerProps) => {
  const screenWidth = useScreenWidth();

  const getHeight = getSizeStyle(
    height[0],
    height[1],
    height[2],
    screenWidth,
    doNotResizeHeight
  );

  const getWidth = getSizeStyle(
    width[0],
    width[1],
    width[2],
    screenWidth,
    doNotResizeWidth
  );

  return (
    <div style={{ height: getHeight, width: getWidth, ...style }} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  height: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  width: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  doNotResizeHeight: PropTypes.bool,
  doNotResizeWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Container;
