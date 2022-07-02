import type { NextPage } from "next";
import styled from "styled-components";
import React from "react";
import { isLogged } from "../../utils/isLogged";
import { goToViewPage } from "../../utils/redirect/goToViewPage";

const Container = styled.div`
  min-height: 100vh;
  background-color: #000;
`;
const FormContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const JoinForm = styled.form`
    background-color: #16161e;
    height: 3rem;
    width: 30rem;
    gap: 20px;
    display: flex;
    align-items: center;
    border-radius: 30px;
`;
const Input = styled.input`
    background-color: unset;
    color: #fff;
    font-size: 1.2rem;
    width: 80%;
    padding-left: 20px;

`;
const Submit = styled.button`
    background-color: unset;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    width: 20%;
`;
const Heading = styled.h1`
    color: #fff;
    font-weight: 100;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    
`
const Join: NextPage = () => {


  function joinToForm(e: any) {
    e.preventDefault()
    const token: string = isLogged().toString();
    const formToken: string = e.target.formToken.value;

    fetch(`${process.env.BACKEND_API}/form/join/${formToken}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
      res.ok ? goToViewPage(formToken) : alert("Cannot join to Form")
    })
    .catch(err => console.error(err));
  }

  return (
    <Container>
      <FormContainer>
        <Card>
            <Heading>Join to Form</Heading>
            <JoinForm onSubmit={joinToForm}>
                <Input name="formToken"/>
                <Submit>Join</Submit>
            </JoinForm>
        </Card>
      </FormContainer>
    </Container>
  );
};

export default Join;
