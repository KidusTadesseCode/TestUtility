import React from "react";
import styled, { css } from "styled-components";
// thickness
const IconHamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : "25px")};
  div {
    width: ${({ width }) => (width ? `${width}px` : "25px")};
    height: ${({ thickness }) => (thickness ? `${thickness}px` : "3px")};

    background-color: ${({ linecolor }) => (linecolor ? linecolor : "green")};
    margin: ${({ height }) => (height ? `${height}px 0` : "2px 0")};
    transition: 0.4s;
    &:nth-child(2) {
      ${({ right }) =>
        right &&
        css`
          width: ${({ width }) => (width ? `${width - 5}px` : "20px")};
        `};

      ${({ left }) =>
        left &&
        css`
          width: ${({ width }) => (width ? `${width - 5}px` : "20px")};
          margin-left: 5px;
        `};
    }
  }
`;

function Hamburger({
  onClick,
  linecolor,
  right,
  left,
  width,
  height,
  thickness,
}) {
  return (
    <IconHamburger
      thickness={thickness && thickness}
      width={width && width}
      height={height && height}
      onClick={onClick && onClick}
      linecolor={linecolor && linecolor}
      right={right && right}
      left={left}
    >
      <div></div>
      <div></div>
      <div></div>
    </IconHamburger>
  );
}

export default Hamburger;
