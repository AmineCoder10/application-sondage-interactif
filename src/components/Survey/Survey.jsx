import { useState } from 'react'
import Cards from '../Cards/Cards';

function Survey() {
  let question1 = "wach hna zsdf sdjkfn zkjfnzvf ?"
  let question2 = "what is the best team ?"
  let question3 = "please what is the reel world ?"
  const [survey, setSurvey] = useState([
    { id: 1, title: "football", question: {question1} },
    { id: 2, title: "football", question: {question2} },
    { id: 3, title: "football", question: {question3} }
  ]);
  

  return (
    <div>
      {survey.map((surv) => (
        <Cards key={surv.id} title={surv.title} questions={surv.question} />
      ))}
    </div>
  );
}

export default Survey