// import { useEffect } from "react";
// import { _getQuestions } from "../_DATA";
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { questionsActions } from '../store/Questions';
// import { questionsActions } from "../store/Questions";

const Questions=()=>{
       
        const dispatch=useDispatch();
        var questions=useSelector(state=>state.question.questions);
        const userid=useSelector(state=>state.auth.id)
        // const answered=useSelector(state=>state.question.answered);
        // const unAnswered=useSelector(state=>state.question.unAnswered);
        const users=useSelector(state=>state.user.users);
        
        const Answered=questions.filter((question)=>question.optionOne.votes.includes(userid)||question.optionTwo.votes.includes(userid))
 

   const unAnswered=questions.filter((question)=>!question.optionOne.votes.includes(userid)&&!question.optionTwo.votes.includes(userid))
//    console.log(unAnswered)
   dispatch(questionsActions.getquestions({questions:questions,answered:Answered,unAnswered:unAnswered}));
       
        

    return (
    <div className={"card p-4 m-4   text-center"}>
        <h1>Unanswered Polls</h1>
        <ul>

                {
                    unAnswered.map((answer=>{
                    return (<Link  to="/question" state={{ questionid: answer.id }}> <li key={answer.id}  className="list-unstyled">
                        
                                <div className={"card p-4 m-4   h-100  text-center"} style={{ height: "1rem"}}>

                                    <div className={"row"}>
                                        
                                        <div className={"col-4 text-center"}> 
                                            <div className={"card border-0 "} style={{width: "15rem"}}>
                                                <img style={{ height: "3rem", width:"3rem" }} className={"card-img-top rounded-circle rounded mx-auto d-block"} src={(users.filter(user=>user.id===answer.author))[0].avatarURL} alt="Card  cap"/>
                                                <div className={"card-body"}>
                                                    <h6 className={"card-title"}>Poll By: {answer.author}</h6>
                                                    
                                                </div>
                                            
                                            </div>
                                        </div>

                                        <div className={"col-8 text-left"}>
                                        
                                        

                                            <p>Would you rather {answer.optionOne.text} or{answer.optionTwo.text}?</p>    
                                            {
                                                "Created on "+  Date(answer.timestamp * 1000)                                       
                                            
                                            }              
                                            

                                            
                                        
                                        </div>
                                    </div>
                                    
                                </div>


                            
                        </li></Link>)
                    }))
                }
         </ul>
      






        <h1>Answered Polls</h1>
        <ul>

            {
                Answered.map((answer=>{
                return (<Link  to="/question" state={{ questionid: answer.id }}> <li key={answer.id}  className="list-unstyled">
                            <div className={"card p-4 m-4   h-100  text-center"} style={{ height: "1rem"}}>

                                <div className={"row"}>
                                    
                                    <div className={"col-4 text-center"}> 
                                        <div className={"card border-0 "} style={{width: "15rem"}}>
                                            <img style={{ height: "3rem", width:"3rem" }} className={"card-img-top rounded-circle rounded mx-auto d-block"} src={(users.filter(user=>user.id===answer.author))[0].avatarURL} alt="Card  cap"/>
                                            <div className={"card-body"}>
                                                <h6 className={"card-title"}>Poll By: {answer.author}</h6>
                                                
                                            </div>
                                        
                                        </div>
                                    </div>

                                    <div className={"col-8 text-left"}>
                                    
                                    

                                        <p>Would you rather {answer.optionOne.text} or{answer.optionTwo.text}?</p>    
                                        {
                                            "Created on "+  Date(answer.timestamp * 1000)                                       
                                        
                                        }              
                                        

                                        
                                    
                                    </div>
                                </div>
                                
                            </div>
            

                        
                    </li></Link>)
                }))
            }
        </ul>

      

          
    </div>

    );
}

export default Questions;