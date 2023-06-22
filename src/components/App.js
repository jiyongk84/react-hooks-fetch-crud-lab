import React, { useEffect , useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);


  const onAddQuestion = (newQuestion) => {
  setQuestions([...questions, newQuestion])
}

useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then(r => r.json())
  .then(questionData => {setQuestions(questionData);
  })}
,[])



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={onAddQuestion}/> : <QuestionList setQuestions={setQuestions} questions={questions}/>}
    </main>
  );
}

export default App;
