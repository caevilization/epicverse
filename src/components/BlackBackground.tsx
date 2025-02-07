import React from "react";
import "./BlackBackground.css";
import bannerDecoration from "../assets/images/banner-decoration.png";

interface BlackBackgroundProps {
  height?: number;
  children?: React.ReactNode;
}

const BlackBackground: React.FC<BlackBackgroundProps> = ({
  height = 941,
  children,
}) => {
  return (
    <div className="black-background">
      <div className="black-section" style={{ height: `${height}px` }}>
        <div className="content-wrapper">{children}</div>
      </div>
      <div className="banner-decoration">
        <img src={bannerDecoration} alt="decoration" />
      </div>
    </div>
  );
};

export default BlackBackground;
