import { type CSSProperties } from "react";

interface HamburgerMenuIconProps {
  isOpened: boolean;
  width?: number;
  height?: number;
  color?: string;
}

export const HamburgerMenuIcon = ({
  isOpened,
  width = 16,
  height = 15,
  color = "currentColor",
}: HamburgerMenuIconProps) => {
  const svgStyles: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    cursor: "pointer",
    transitionDuration: ".3s",
    transform: isOpened ? "rotate(45deg)" : "none",
  };

  const pathStyles: CSSProperties = {
    fill: "none",
    stroke: color,
    strokeWidth: 8,
    transitionDuration: ".3s",
    strokeLinecap: "round",
  };

  const topStyles: CSSProperties = {
    ...pathStyles,
    strokeDasharray: "40 160",
    strokeDashoffset: isOpened ? "-64px" : "0",
  };

  const middleStyles: CSSProperties = {
    ...pathStyles,
    transformOrigin: "50%",
    strokeDasharray: "40 142",
    transform: isOpened ? "rotate(90deg)" : "none",
  };

  const bottomStyles: CSSProperties = {
    ...pathStyles,
    transformOrigin: "50%",
    strokeDasharray: "40 85",
    strokeDashoffset: isOpened ? "-64px" : "0",
  };

  return (
    <svg className="ham" viewBox="0 0 100 100" style={svgStyles}>
      <path
        className="line top"
        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        style={topStyles}
      ></path>
      <path
        className="line middle"
        d="m 30,50 h 40"
        style={middleStyles}
      ></path>
      <path
        className="line bottom"
        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        style={bottomStyles}
      ></path>
    </svg>
  );
};
