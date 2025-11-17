import React from "react";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <StyledWrapper>
      <div className="loader-wrapper">
        <span className="loader-letter">L</span>
        <span className="loader-letter">O</span>
        <span className="loader-letter">A</span>
        <span className="loader-letter">D</span>
        <span className="loader-letter">I</span>
        <span className="loader-letter">N</span>
        <span className="loader-letter">G</span>

        <div className="loader" />

        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
        <div className="star" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;

  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    font-family: "Poppins", sans-serif;
    font-size: 1.2em;
    font-weight: 600;
    color: #fff;
    border-radius: 50%;
    background-color: #222a;
    box-shadow: 0 0 60px -10px #fff5;
    user-select: none;
  }

  .loader {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: transparent;
    animation: loader-rotate 2s linear infinite;
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(90deg);
      box-shadow: 0 10px 20px #fff inset, 0 20px 30px #fff5 inset,
        0 60px 60px #f001 inset;
    }
    50% {
      transform: rotate(270deg);
      box-shadow: 0 10px 20px #fff inset, 0 20px 10px #fa09 inset,
        0 40px 60px #f002 inset;
    }
    100% {
      transform: rotate(450deg);
      box-shadow: 0 10px 20px #fff inset, 0 20px 30px #fff5 inset,
        0 60px 60px #f001 inset;
    }
  }

  .loader-letter {
    opacity: 0.4;
    animation: loader-letter-anim 2s infinite;
    margin: 0 0.2em;
  }

  .loader-letter:nth-child(1) { animation-delay: 0s; }
  .loader-letter:nth-child(2) { animation-delay: 0.1s; }
  .loader-letter:nth-child(3) { animation-delay: 0.2s; }
  .loader-letter:nth-child(4) { animation-delay: 0.3s; }
  .loader-letter:nth-child(5) { animation-delay: 0.4s; }
  .loader-letter:nth-child(6) { animation-delay: 0.5s; }
  .loader-letter:nth-child(7) { animation-delay: 0.6s; }

  @keyframes loader-letter-anim {
    0%, 100% {
      opacity: 0;
      transform: translateY(0);
    }
    20% {
      opacity: 1;
      transform: scale(1.2) translateY(-2px);
      text-shadow: 0 0 3px #fff, 0 0 7px #fff;
    }
    40% {
      opacity: 0.7;
    }
  }

  .star {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 8px #fff;
    opacity: 0.25;
    animation: blur-anim 2s infinite;
  }

  .star:nth-of-type(2) { transform: translate(56px, 46px); animation-delay: 0.2s; }
  .star:nth-of-type(3) { transform: translate(-26px, 56px); animation-delay: 0.4s; }
  .star:nth-of-type(4) { transform: translate(-50px, -70px); animation-delay: 0.7s; }
  .star:nth-of-type(5) { transform: translate(32px, -66px); animation-delay: 0.35s; }
  .star:nth-of-type(6) { transform: translate(82px, -36px); animation-delay: 0.9s; }
  .star:nth-of-type(7) { transform: translate(-92px, 26px); animation-delay: 1s; }

  @keyframes blur-anim {
    0%, 100% { opacity: 0.2; filter: blur(4px); }
    50% { opacity: 0.35; filter: blur(1px); }
  }
`;

export default LoadingSpinner;
