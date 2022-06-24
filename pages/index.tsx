import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import styled from "styled-components";

import { isLogged } from "../utils/isLogged";
import { goToCreatePage } from "../utils/redirect/goToCreatePage";
import { goToJoinPage } from "../utils/redirect/goToJoinPage";
import { goToLoginPage } from "../utils/redirect/goToLoginPage";

const Container = styled.div`
  background-color: #000000;
  background: -webkit-linear-gradient(to top, #360492, #000000);
  background: linear-gradient(to top, #360492, #000000);
  height: 100vh;
  display: grid;
  place-content: center center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    & > div {
      cursor: pointer;
    }
    h1 {
      color: #fff;
      font-weight: 100;
      font-size: 5rem;
    }
  }
`;
const Header = styled.header`
  position: absolute;
  top: 0;
  height: 4rem;
  width: 100%;
  background: #000;
`;
const Nav = styled.nav`
  box-shadow: 0 0 10px 0 #111112;
  height: 4rem;
  display: flex;
  justify-content: end;
  align-items: center;
  background: #000000;
  ul {
    display: flex;
    width: 10rem;
    justify-content: center;
    margin-right: 20px;
  }
  ul li a {
    color: #fff;
    padding-inline: 10px;
    cursor: pointer;
  }
`;
const Index: NextPage = () => {
  function handleArrow(): void {
    if (isLogged()) {
      goToCreatePage();
    }
    goToLoginPage();
  }
  return (
    <Container>
      <Header>
        <Nav>
          <ul>
            <li>
              <a onClick={goToLoginPage}>Login</a>
            </li>
            <li>
              <a onClick={goToCreatePage}>Create</a>
            </li>
            <li>
              <a onClick={goToJoinPage}>Join</a>
            </li>
          </ul>
        </Nav>
      </Header>
      <div>
        <h1>Create your own Form</h1>
        <div>
          <FontAwesomeIcon
            onClick={handleArrow}
            icon={faArrowDown}
            color="#fff"
            size="3x"
          />
        </div>
      </div>
    </Container>
  );
};

export default Index;
