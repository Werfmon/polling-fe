import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../Constants/Header";
import { isLogged } from "../../utils/isLogged";
import { goToMainPage } from "../../utils/redirect/goToMainPage";

const Container = styled.div`
  min-height: 100vh;
  background-color: #000;
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
const FormInputName = styled.h1`
  background-color: unset;
  width: 70%;
  text-align: center;
  margin-top: 30px;
  height: 5rem;
  font-size: 2.8rem;
  padding: 10px;
  color: #fff;
`;
const FormInputDescription = styled.h2`
  background-color: unset;
  width: 70%;
  text-align: center;
  margin-top: 30px;
  height: 5rem;
  font-size: 2rem;
  padding: 10px;
  font-weight: 100;
  color: #fff;
`;
const QuestionText = styled.p`
  background-color: unset;
  margin-top: 30px;
  font-size: 2rem;
  padding: 10px;
  color: #fff;
`;
const AnswerText = styled.p`
  background-color: unset;
  margin-top: 30px;
  font-size: 2rem;
  padding: 10px;
  color: #fff;
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
`;
const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  width: 90%;
`;

interface FormData {
  name: string;
  description: string;
  questions: [
    {
      title: string;
      description: string;
      answers: [
        {
          text: string;
          correct: boolean;
        }
      ];
    }
  ];
}
interface ResultData {
    result: number
}

const View: NextPage = () => {
  const [formData, setFormData] = useState<FormData>();
  useEffect(() => {
    const token: string = isLogged().toString();
    const formToken: string =  window.location.search.replace("?token=", "")

    fetch(`${process.env.BACKEND_API}/form/join/${formToken}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : goToMainPage();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => console.error(err));
  }, []);
  function evaluate(e: any) {
    e.preventDefault()
    let points: number = 0;
    if(formData?.questions !== undefined) {
        for (let i = 0; i < formData?.questions.length; i++) {
            for(let j = 0;j < formData?.questions[i].answers.length;j++) {
                if(e.target['correct' + i][j].checked === formData?.questions[i].answers[j].correct && formData?.questions[i].answers[j].correct === true) {
                    points++;
                }
            }
        }
    }

    const token: string = isLogged().toString();
    const formToken: string = window.location.search.replace("?token=", "");

    const data: ResultData = {
        result: points
    }

    fetch(`${process.env.BACKEND_API}/form/${formToken}/result/save`, {
        method: 'POST',
        headers: {
            'content-type': Header.CONTENT_TYPE_JSON,
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => {
        if(res.ok) {
            alert('The result has been saved')
        }else {
            alert('Something went wrong')
        }
        goToMainPage()
    }).catch(err => console.error(err))
}
  return (
    <Container>
      <h1>Form</h1>
      <FormContainer>
        <Form onSubmit={evaluate}>
          <InputContainer>
            <FormInputName>{formData?.name}</FormInputName>
          </InputContainer>
          <InputContainer>
            <FormInputDescription>{formData?.description}</FormInputDescription>
          </InputContainer>
          {formData?.questions.map((question, qKey) => {
            return (
              <QuestionContainer key={qKey} className="questionContainer">
                <QuestionText>{question.title}</QuestionText>
                <AnswerContainer>
                  {question.answers.map((answer, aKey) => {
                    return (
                      <CorrectRadioContainer key={aKey}>
                        <AnswerText>{answer.text}</AnswerText>
                        <CorrectRadio type="radio" name={'correct' + qKey} />
                      </CorrectRadioContainer>
                    );
                  })}
                </AnswerContainer>
              </QuestionContainer>
            );
          })}
          <CreateButtonContainer>
            <CreateButton>Send</CreateButton>
          </CreateButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default View;
