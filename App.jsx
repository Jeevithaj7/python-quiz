import { useState } from "react";
import "./App.css";

function App() {
  const questions = [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      answer: "def",
    },
    {
      question: "Which of these is a Python data type?",
      options: ["integer", "float", "character", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "/* */", "#", "<!-- -->"],
      answer: "#",
    },
    {
    question: "which datatype is used for decimal numbers in Python?",
      options: ["int", "float", "str", "bool"],
      answer: "float",
    },
    {
    question: "what does len() do?",
      options: ["adds numbers","find the length ","find the length of a string","find the length of a list"],
      answer: "find the length"
    },
     {
    question: "which keyword is used for a condition?",
      options: ["if", "else", "for", "while"],
      answer: "if"
    },
     {
    question: "which operator is used for exponentiation?",
      options: ["^", "**", "exp", "pow"],
      answer: "**"
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setUserAnswers([...userAnswers, option]);

    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer("");
    setShowFeedback(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const question = questions[currentQuestion];

  if (isQuizFinished) {
    return (
      <div className="quiz-container">
        <h1>🐍 Python Quiz</h1>
        <div className="quiz-card">
          <h2>Quiz Completed!</h2>
          <p className="final-score">
            Your Total Score: <strong>{score} out of {questions.length}</strong>
          </p>
          <p className="percentage">
            Percentage: {((score / questions.length) * 100).toFixed(2)}%
          </p>

          <div className="results-section">
            <h3>Review Your Answers:</h3>
            {questions.map((q, index) => (
              <div key={index} className="result-item">
                <p className="result-question">
                  <strong>Q{index + 1}: {q.question}</strong>
                </p>
                <p className={`result-answer ${userAnswers[index] === q.answer ? "correct" : "incorrect"}`}>
                  <span>Your Answer: <strong>{userAnswers[index]}</strong></span>
                </p>
                <p className="result-correct">
                  <span>Correct Answer: <strong>{q.answer}</strong></span>
                </p>
              </div>
            ))}
          </div>

          <button
            className="next-button"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer("");
              setUserAnswers([]);
              setIsQuizFinished(false);
            }}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>🐍 Python Quiz</h1>

      <div className="quiz-card">
        <p className="question-number">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <h2>{question.question}</h2>

        <div className="options">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={selectedAnswer === option ? "selected" : ""}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="next-button"
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestion === questions.length - 1
            ? "Finish"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default App;