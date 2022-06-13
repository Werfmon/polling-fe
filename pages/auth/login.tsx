import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from "../../Constants/Header";
import {encodeBody} from '../../utils/encodeBody'
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  background-color: #000;
  place-items: center center;
`;
const FormContainer = styled.div`
  position: relative;
`;

const UpItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 2rem;
  color: #ffffff;
  background-color: #2d0ec8;
  width: 12rem;
  height: 4rem;
  letter-spacing: 2px;
  position: absolute;
  top: 2rem;
  border-radius: 50px;
  left: -5rem;
`;
const Form = styled.form`
  height: 30rem;
  width: 20rem;
  box-shadow: rgba(46, 46, 170, 0.4) -5px 5px, rgba(46, 46, 170, 0.3) -10px 10px,
    rgba(46, 46, 170, 0.2) -15px 15px, rgba(46, 46, 170, 0.1) -20px 20px,
    rgba(46, 46, 170, 0.05) -25px 25px;
  background-color: #191e31c2;
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  height: 2rem;
  width: calc(100% - 4rem);
  margin-block: 10px;
  position: absolute;
  color: #fff;
  z-index: 10;
  background-color: #00000000;
  border-bottom: 2px solid #9e9ea0;
  &:focus ~ label {
    font-size: 0.7rem;
    top: -0.8rem;
    color: #fff;
  }
`;
const Submit = styled.button`
  margin-right: 2rem;
  align-self: flex-end;
  background-color: unset;
  margin-top: 1rem;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    color: #adadad;
  }
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 2rem;
  margin-block: 0.8rem;
`;
const Label = styled.label`
  position: absolute;
  left: 2rem;
  color: #ffffffa0;
  justify-self: flex-start;
  transition: all 0.4s;
  font-size: 1rem;
  top: 0;
`;

interface LoginData {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  useEffect(() => {
    const labels = document.getElementsByClassName("login-label");
    const inputs = document.getElementsByClassName("login-input");
    inputs[0].addEventListener("focus", () => {
      labels[0].classList.add("getout-label");
    });
    inputs[1].addEventListener("focus", () => {
      labels[1].classList.add("getout-label");
    });
  }, []);

  function login(e: any): void {
    e.preventDefault();
    
    const data: LoginData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    fetch(`${process.env.BACKEND_API}/login`, {
      method: "POST",
      headers: {
        "content-type": Header.CONTENT_TYPE_URLENCODED,
      },
      body: encodeBody(data),
    })
      .then((res) => res.json())
      .then((resData) => sessionStorage.setItem("token", resData.token))
      .catch((err) => console.error(err));
  }

  return (
    <Container>
      <FormContainer>
        <UpItem>Login</UpItem>
        <Form onSubmit={e => login(e)}>
          <InputContainer>
            <Input name="username" className="login-input" type="text" />
            <Label className="login-label">Username</Label>
          </InputContainer>
          <InputContainer>
            <Input name="password" className="login-input" type="password" />
            <Label className="login-label">Password</Label>
          </InputContainer>
          <Submit>Login</Submit>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;

