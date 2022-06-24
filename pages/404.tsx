import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { goToMainPage } from "../utils/redirect/goToMainPage";

const Container = styled.div`
  background-color: #000;
  height: 100vh;
  display: grid;
  place-content: center;
  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 60px;
  }
  div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  h1 {
    color: #fff;
    font-weight: 100;
    font-size: 3rem;

  }
  p {
    margin-left: 20px;
    color: #fff;
  }
`;

const Custom404Page: NextPage = () => {
  return (
    <Container>
      <div>
        <h1>404 - not found</h1>
        <div onClick={goToMainPage}>
            <FontAwesomeIcon
                icon={faArrowLeft}
                color="#fff"
                size="3x"
            />
            <p>go to main page</p>
          </div>
      </div>
    </Container>
  );
};

export default Custom404Page;
