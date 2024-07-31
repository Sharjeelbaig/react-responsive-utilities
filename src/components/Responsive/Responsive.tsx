import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

export const ScreenWidthContext = createContext<number>(0);

export const useScreenWidth = () => useContext(ScreenWidthContext);

export const Responsive = ({
  screenWidth,
  children,
}: {
  screenWidth: number;
  children: React.ReactNode;
}) => (
  <ScreenWidthContext.Provider value={screenWidth}>
    {children}
  </ScreenWidthContext.Provider>
);

Responsive.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
