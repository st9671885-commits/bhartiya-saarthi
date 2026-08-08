import {useState} from "react";

function Assistant(){

const [question,setQuestion]=useState("");
const [answer,setAnswer]=useState("");

const askAI=async()=>{

setAnswer("Thinking...");

try{

const response=await fetch(
"http://localhost:8000/ask",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question:question
})
}
);

const data=await response.json();

setAnswer(data.answer);

}

catch(error){

setAnswer(
"Unable to connect with Saarthi AI"
);

}

};


return(

<div className="assistant">

<h2>
🤖 Saarthi AI Assistant
</h2>


<input

placeholder="Ask your government service query..."

value={question}

onChange={
(e)=>setQuestion(e.target.value)
}

/>


<button onClick={askAI}>
Ask Saarthi
</button>


<div className="response">

{answer}

</div>


</div>


)

}

export default Assistant;