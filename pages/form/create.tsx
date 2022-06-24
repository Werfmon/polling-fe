import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  background-color: #000;
  min-height: 100vh;
  padding-block: 30px;
  h1 {
    width: 70%;
    margin: 0 auto;
    color: #fff;
    font-weight: 100;
    height: 4rem;
  }
`;
const FormContainer = styled.div`
  width: 70%;
  min-height: 100vh;
  border-radius: 30px;
  margin: 0 auto;
  background: #060606;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Form = styled.form`
  height: 100%;
  width: 100%;
`;
const Input = styled.input``;
const FormInputName = styled.input`
  background-color: unset;
  width: 70%;
  text-align: center;
  margin-top: 30px;
  height: 5rem;
  font-size: 2.8rem;
  padding: 10px;
  color: #fff;
  &::placeholder {
    text-align: center;
    font-size: 3rem;
  }
`;
const FormInputDescription = styled.input`
  background-color: unset;
  width: 70%;
  text-align: center;
  margin-top: 30px;
  height: 5rem;
  font-size: 2rem;
  padding: 10px;
  color: #fff;
  &::placeholder {
    text-align: center;
    font-size: 2rem;
  }
`;
const QuestionInput = styled.input`
  background-color: unset;
  margin-top: 30px;
  font-size: 2rem;
  padding: 10px;
  color: #fff;
  &::placeholder {
    font-size: 2rem;
  }
`;
const AnswerInput = styled.input`
  background-color: unset;
  margin-top: 30px;
  height: 2rem;
  font-size: 2rem;
  padding: 10px;
  color: #fff;
  &::placeholder {
    font-size: 2rem;
  }
`;
const QuestionContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  font-size: 2rem;
  padding: 10px;
`;
const AnswerContainer = styled.div`
  padding: 10px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const CorrectRadio = styled.input`
  display: flex;
  margin-top: 10px;
`;
const CorrectRadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;
const AddQuestionbutton = styled.button`
  color: #fff;
  background-color: unset;
  width: 100%;
  cursor: pointer;
  height: 6rem;
`;
const CreateButton = styled.button`
  color: #fff;
  background-color: unset;
  height: 6rem;
  font-size: 2rem;
font-weight: 100;
`
const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  width: 90%;

`
const Create: NextPage = () => {
  const [questions, setQuestions] = useState([null]);
  function addQuestion(e: any) {
    e.preventDefault();
    setQuestions([...questions, null]);
  }

  return (
    <Container>
      <h1>Create Form</h1>
      <FormContainer>
        <Form>
          <InputContainer>
            <FormInputName
              type="text"
              name="formName"
              placeholder="Form name"
            />
          </InputContainer>
          <InputContainer>
            <FormInputDescription
              maxLength={100}
              type="text"
              name="formDescription"
              placeholder="Form description"
            />
          </InputContainer>
          {questions.map((_, i) => (
            <QuestionContainer className='questionContainer'>
              <QuestionInput placeholder="Question..." />
                <AnswerContainer>
                  <CorrectRadioContainer>
                    <AnswerInput placeholder="Answer..." />
                    <CorrectRadio name={"correct" + i} type="radio" />
                  </CorrectRadioContainer>
                  <CorrectRadioContainer>
                    <AnswerInput placeholder="Answer..." />
                    <CorrectRadio name={"correct" + i} type="radio" />
                  </CorrectRadioContainer>
                  <CorrectRadioContainer>
                    <AnswerInput placeholder="Answer..." />
                    <CorrectRadio name={"correct" + i} type="radio" />
                  </CorrectRadioContainer>
                </AnswerContainer>
              </QuestionContainer>
            )) 
          }
          <AddQuestionbutton>
            <FontAwesomeIcon onClick={addQuestion} icon={faAdd} size="2x" />
          </AddQuestionbutton>
          <CreateButtonContainer>
            <CreateButton>Create</CreateButton>
          </CreateButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};
export default Create;
