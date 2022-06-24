import type { NextPage } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from "../../Constants/Header";
import { goToMainPage } from "../../utils/redirect/goToMainPage";
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
  width: 14rem;
  height: 4rem;
  letter-spacing: 2px;
  position: absolute;
  top: 2rem;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 50px;
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

interface RegistrationData {
  username: string;
  password: string;
}

const Registration: NextPage = () => {
  useEffect(() => {
    const labels = document.getElementsByClassName("registration-label");
    const inputs = document.getElementsByClassName("registration-input");
    for (let i = 0; i < labels.length; i++) {
        inputs[i].addEventListener("focus", () => {
            labels[i].classList.add("getout-label");
        });
    }
  }, []);

  function Registration(e: any): void {
    e.preventDefault();

    const password: String = e.target.password.value;
    const passwordRepeat: String = e.target.repeatPassword.value;
    if(password === passwordRepeat) {

        const data: RegistrationData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        
        fetch(`${process.env.BACKEND_API}/auth/registration`, {
          method: "POST",
          headers: {
            "content-type": Header.CONTENT_TYPE_JSON,
        },
        body: JSON.stringify(data),
        })
        .then(res => res.ok ? goToMainPage() : alert("Something went wrong"))
        .catch((err) => console.error(err));
    } else {
        alert("Passwords don`t match");
    }
  }

  return (
    <Container>
      <FormContainer>
        <UpItem>Registration</UpItem>
        <Form onSubmit={e => Registration(e)}>
          <InputContainer>
            <Input name="username" className="registration-input" type="text" />
            <Label className="registration-label">Username</Label>
          </InputContainer>
          <InputContainer>
            <Input name="password" className="registration-input" type="password" />
            <Label className="registration-label">Password</Label>
          </InputContainer>
          <InputContainer>
            <Input name="repeatPassword" className="registration-input" type="password" />
            <Label className="registration-label">Repeat Password</Label>
          </InputContainer>
          <Submit>Register</Submit>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Registration;