import { css } from "styled-components";

const Content = css`
  overflow: scroll;
  height: 100vh;
  display: grid;
  padding: 15px;
`;

const Card = css`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  padding: 15px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: background-color 0.3s;
  border-radius: 10px;

  h1 {
    font-weight: 100;
  }

  h2,
  h3 {
    font-weight: 200;
  }
`;

const Button = css`
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  background-color: whitesmoke;
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    background-color: white;
  }
`;

const GrowFromMiddle = css`
  @keyframes GrowFromMiddle {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ShrinkToMiddle = css`
  @keyframes ShrinkToMiddle {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
`;

const FadeOut = css`
  @keyframes FadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  padding-bottom: 20px;
  padding-top: 10px;
  max-height: auto;

  h1 {
    font-size: 3em;
    color: white;
    font-weight: 100;
  }
`;

export {
  Content,
  Card,
  Button,
  GrowFromMiddle,
  ShrinkToMiddle,
  FadeOut,
  Header,
};
