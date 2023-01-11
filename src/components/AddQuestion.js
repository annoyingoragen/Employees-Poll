import { useRef } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { questionsActions } from "../store/Questions";
import { usersActions } from "../store/Users";
import {formatQuestion} from '../_DATA'

const AddQuestion=()=>{
  const navigate=useNavigate();
    var users=useSelector(state=>state.user.users);
    var questions=useSelector(state=>state.question.questions);
    const user=useSelector(state=>state.auth.id);
    var Answered=useSelector(state=>state.question.answered);
    var unAnswered=useSelector(state=>state.question.unAnswered);
    
    const OptionOne = useRef('');
    const OptionTwo = useRef('');
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        var requireduser =users.filter(us=>us.id===user);
        console.log(OptionOne.current.value);
          var question=formatQuestion(OptionOne.current.value,OptionTwo.current.value,user);
          var questionslen=questions.length;

        var updatedquestions={...questions,[questionslen]:question}
        console.log(questions)
        // console.log(updatedquestions)
        questions = Object.values(updatedquestions);
        console.log(questions)
        console.log(requireduser[0])
        var questionid=question.id;
        var requiredquestion=[...requireduser[0].questions,questionid]
        requireduser[0]={...requireduser[0],questions:requiredquestion};

       console.log(requireduser[0])
        let indexofuser=users.findIndex((use)=>use.id===requireduser[0].id)
         users={...users,[indexofuser]:requireduser[0]};
         users = Object.values(users);
        
         console.log(questions);
         console.log(users)
         dispatch(questionsActions.getquestions({questions:questions,answered:Answered,unAnswered:unAnswered}));
         dispatch(usersActions.getusers({users:users}));
         navigate("/");
    }
    return( <div className={"card p-4 m-4   text-center"}>

         
       <h1>Add a new Poll</h1>

        
        
            <form onSubmit={submitHandler} >

            
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Option One</label>
    <input type="text" ref={OptionOne} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Option Two</label>
    <input type="text"   ref={OptionTwo} class="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
   
                

            
            </form>
        </div>)
}

export default AddQuestion;