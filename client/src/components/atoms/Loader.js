import React from 'react';
import styled, { css } from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLoader = styled.div(
  ({ size }) => css`
    display: inline-block;
    width: ${size && size === 'small' ? '20px' : '80px'};
    height: ${size && size === 'small' ? '20px' : '80px'};
    text-align: center;

    &::after {
      content: ' ';
      display: block;
      width: ${size && size === 'small' ? '10px' : '64px'};
      height: ${size && size === 'small' ? '10px' : '64px'};
      margin: ${size && size === 'small' ? '0' : '8px'};
      border-radius: 50%;
      border: 6px solid var(--primary-color);
      border-color: ${size && size === 'small'
        ? 'var(--white-color) transparent var(--white-color) transparent'
        : 'var(--primary-color) transparent var(--primary-color) transparent'};
      animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
);

const Loader = ({ size }) => (
  <LoaderWrapper>
    <StyledLoader size={size} />
  </LoaderWrapper>
);

export default Loader;
