import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions}) {

  const handleDeleteClick = async (id) => {
  const config = {method: "DELETE"}
  const response = await fetch(`${"http://localhost:4000/questions"}/${id}`, config)

  const filteredQuestions = questions.filter(question => question.id !== id)
  setQuestions(filteredQuestions)
  }

  const handleAnswerChange = async (selection, id) => {
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({correctIndex: selection})
    }
    const response = await fetch(`${"http://localhost:4000/questions"}/${id}`, config).then(r => r.json())
    
    const updatedQuestions = questions.map(question => {
      if (question.id ===id) {
        return response
      } else return question 
    }
    )
    setQuestions(updatedQuestions)
  }
  const questionMap = questions.map(question =>
    <QuestionItem key={question.id} onAnswerChange={handleAnswerChange} onDeleteClick={handleDeleteClick} question={question} />
  )

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
