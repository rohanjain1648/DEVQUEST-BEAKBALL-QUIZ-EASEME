import * as React from "react";
import { getQuestion } from "./quizApiHandler"; // Importing getQuestion

import {
  saveEmailToLocalStorage,
  getEmailFromLocalStorage,
  RemoveEmailFromStorage,
} from "../login/loginUser";

import Timer from "../timer/Timer";

const Quiz = () => {
  const [email, setEmail] = React.useState(null);
  const [isValid, setIsValid] = React.useState(false); 
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [questionArr, setQuestionArr] = React.useState([]);
  const [redirectToQuiz, setRedirectToQuiz] = React.useState(false);
  const [ansArr, setAnsArr] = React.useState([]);
  const [score, setScore] = React.useState(0); // Ensure this variable is defined
  const [performanceData, setPerformanceData] = React.useState([]); // New state for performance tracking
  const totalTime = 20; // Set total time for each question (20 seconds)
  const [submit, setSubmit] = React.useState(false);

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setIsValid(validateEmail(inputValue));
  };

  React.useEffect(() => {
    RemoveEmailFromStorage();
  }, [email]);

  const handleSaveEmail = () => {
    if (isValid && email != null) {
      saveEmailToLocalStorage(email);
      setRedirectToQuiz(true);
    }
  };

  const savedEmail = getEmailFromLocalStorage();

  const getQuestionHandler = async (id) => { // Ensure this function is defined
    await getQuestion(id)
      .then((res) => {
        let arr = res?.data?.results?.map((item, index) => ({
          ans: "",
          question: item?.question,
          status: index === 0 ? "visited" : "unvisited",
        }));

        setAnsArr(arr);
        let arr2 = res?.data?.results?.map((item) => ({
          ...item,
          incorrect_answers: [...item?.incorrect_answers, item?.correct_answer],
        }));
        setQuestionArr(arr2);
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    getQuestionHandler("15");
  }, []);

  const CheckAns = (questions, answers) => { // Define CheckAns function
    let score = 0; // Initialize score
    questions.forEach((question, index) => {
      console.log("Question:", question.correct_answer, "User Answer:", answers[index]?.ans); // Debugging line
      if (question.correct_answer === answers[index]?.ans) {
        score++; // Increment score for each correct answer
        // Update performance data
        const category = question.category; // Assuming each question has a category
        setPerformanceData(prevData => {
          const existingCategory = prevData.find(item => item.category === category);
          if (existingCategory) {
            existingCategory.score += 1; // Increment score for the category
          } else {
            return [...prevData, { category, score: 1 }]; // Add new category
          }
          return prevData;
        });
      }
    });
    console.log("Final Score:", score); // Debugging line
    return score; // Return the final score
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (questionIndex < questionArr.length - 1) {
        setQuestionIndex(questionIndex + 1); // Automatically progress to the next question
      } else {
        setSubmit(true); // Submit the quiz if it's the last question
      }
    }, totalTime * 1000); // Convert seconds to milliseconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [questionIndex, questionArr]);

  React.useEffect(() => {
    let arr = [...ansArr];
    if (arr[questionIndex]?.status === "unvisited") {
      const newArr = [...arr];
      newArr[questionIndex].status = "visited";
      setAnsArr(newArr);
    }
  }, [questionIndex, ansArr]);

  return (
    <div className="container mt-4 quiz">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${(questionIndex / questionArr.length) * 100}%` }}></div>
      </div>

      <div>
        {!savedEmail ? (
          <div className="d-flex justify-content-center align-items-center height">
            <div>
              <h2>Quiz App ExamEase</h2>
              <input
                className="h-100 rounded px-3 py-1 mt-3"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="bg-success border fw-medium ms-md-3 mt-3 mt-md-0 p-1 px-3 rounded text-bg-danger"
                onClick={handleSaveEmail}
              >
                Start Quiz{" "}
                <i className="fa-solid fa-play" style={{ color: "#ffffff" }}></i>
              </button>
              {!isValid && <p className="mt-3 ">Please Enter Valid Email</p>}
            </div>
          </div>
        ) : (
          <p className="float-end fs-6 fw-bold text-success user-email">@ {savedEmail}</p>
        )}
      </div>

      <div>
        {!submit && redirectToQuiz && (
          <Timer setSubmit={setSubmit} submit={submit} totalTime={totalTime} onComplete={() => setSubmit(true)} />
        )}
        {!submit && redirectToQuiz && (
          <div className="row" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 1px 0px 5px", paddingTop: "20px", borderRadius: "10px" }}>
            <div className="col-12 col-lg-8 main-height">
              <div className="mt-3 mx-3">
                {questionArr.length > 0 && (
                  <div className="quiz-card">
                    <div className="quiz-card border fw-medium p-3 rounded text-dark">
                      <h6 className="fw-bold ">Question {questionIndex + 1}</h6>
                      <p>{questionArr[questionIndex]?.question}</p>
                    </div>
                  </div>
                )}
                <div className="d-grid">
                  {questionArr[questionIndex]?.incorrect_answers.map((value, index) => (
                    <label key={index} className="option" style={{ display: "inline-block", padding: "5px" }} onClick={() => {
                      let arr = [...ansArr];
                      arr[questionIndex].ans = value;
                      setAnsArr(arr);
                      if (arr[questionIndex]?.status === "visited") {
                        const newArr = [...arr];
                        newArr[questionIndex].status = "attempt";
                        setAnsArr(newArr);
                      }
                    }}>
                      <input
                        className="fs-4"
                        type="radio"
                        name={"option"}
                        style={{ marginRight: "10px" }}
                        value={ansArr[questionIndex]?.ans}
                        checked={ansArr[questionIndex]?.ans === value}
                        onChange={() => {
                          let arr = [...ansArr];
                          arr[questionIndex].ans = value;
                          setAnsArr(arr);
                          if (arr[questionIndex]?.status === "visited") {
                            const newArr = [...arr];
                            newArr[questionIndex].status = "attempt";
                            setAnsArr(newArr);
                          }
                        }}
                      />
                      {value}
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }} className="mt-4">
                  {questionIndex > 0 && (
                    <button className="button" onClick={() => setQuestionIndex(questionIndex - 1)}>
                      Prev
                    </button>
                  )}
                  {questionIndex < questionArr.length - 1 && (
                    <button className="button" onClick={() => setQuestionIndex(questionIndex + 1)}>
                      Next
                    </button>
                  )}
                  {questionIndex === questionArr.length - 1 && (
                    <button className="button" onClick={() => {
                      setScore(CheckAns(questionArr, ansArr));
                      setSubmit(true);
                      setEmail(null);
                    }}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="px-4 mt-4" style={{ height: "450px", borderRadius: "10px", paddingTop: "20px", boxShadow: "1px 0px 5px #0000003d" }}>
                <div className="d-flex justify-content-between mt-3">
                  <h6>Question {questionIndex + 1} / {questionArr.length}</h6>
                  <p>Need Help?</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                  {ansArr?.map((item, index) => (
                    <div key={index}>
                      <button
                        className="border-0 mb-3 ms-2 rounded-5 px-2"
                        style={{
                          background: item?.status === "attempt" ? "#2da94e" : "#0d6efd",
                          borderRadius: "var(--bs-border-radius-xxl) !important",
                          height: "35px",
                          width: "35px",
                          color: "#fff",
                        }}
                        onClick={() => {
                          setScore(CheckAns(questionArr, ansArr));
                          setQuestionIndex(index);
                        }}
                      >
                        {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {submit && ( 
        <div className="result-container">
          <h2 className="result">Score: {score}</h2> 
          <div className="result-feedback">
            <div style={{ display: "flex" }}>
              <div className="alert" style={{ width: "50%", border: "1px solid black" }}>Question</div>
              <div className="alert" style={{ width: "25%", border: "1px solid black" }}>Answer</div>
              <div className="alert" style={{ width: "25%", border: "1px solid black" }}>Status</div>
            </div>
            {questionArr?.map((item, index) => (
              <div key={"ans" + index} style={{ display: "flex" }}>
                <div className="p-3 fw-medium" style={{ width: "50%", border: "1px solid black", color: item?.correct_answer === ansArr[index]?.ans ? "green" : "red" }}>
                  {index + 1}) {item?.question}
                </div>
                <div className="p-3" style={{ width: "25%", border: "1px solid black" }}>{questionArr[index]?.correct_answer}</div>
                <div className="fs-5 fw-medium p-3" style={{ width: "25%", border: "1px solid black" }}>{ansArr[index]?.status}</div>
              </div>
            ))}
            <div className="align-items-center d-flex justify-content-center mt-4 pb-3">
              <button className="bg-danger border-0 fw-bold px-4 rounded-1 text-white" onClick={() => {
                if (window.confirm("Are you sure to restart?")) {
                  RemoveEmailFromStorage();
                  setEmail(null);
                  setSubmit(false);
                  setRedirectToQuiz(false);
                  setAnsArr([]);
                }
              }}>
                Restart
              </button>
              <button onClick={() => window.print()} className="bg-success border-0 fw-bold ms-3 px-2 rounded-1 text-white">
                Print Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
