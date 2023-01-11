import { useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useRef } from 'react';
import { questionsActions } from '../store/Questions';
import { usersActions } from '../store/Users';

const Question=()=>{
    const location = useLocation()

    const { questionid } = location.state;
    
    var users=useSelector(state=>state.user.users);
   
    const user=useSelector(state=>state.auth.id);
    var Answered=useSelector(state=>state.question.answered);
    var unAnswered=useSelector(state=>state.question.unAnswered);
    var questions=useSelector(state=>state.question.questions);
    var question=questions.filter((question)=>question.id===questionid)
    
    const avatarURL=users.filter(user=>user.id===question[0].author)[0].avatarURL
    const dispatch=useDispatch();

    const isAnswered= question[0].optionTwo.votes.includes(user)||question[0].optionOne.votes.includes(user);
  
    let Summary=''
    if (isAnswered){
        const usersForOptionOne=question[0].optionOne.votes.length;
        const usersForOptionTwo=question[0].optionTwo.votes.length;
        // const totalUsers=usersForOptionOne+usersForOptionTwo;
        Summary=` ${usersForOptionOne} users prefer option one while the remaining ${usersForOptionTwo}  prefer option two`;


    }

    const selectedOptionOne = useRef('');
    const selectedOptionTwo = useRef('');


    const submitHandler=(e)=>{
        e.preventDefault();
        
        const selected=selectedOptionOne.current.checked?"OptionOne":"OptionTwo";
        if(selected==="OptionTwo")
        {
            const votes=[...question[0].optionTwo.votes,user];
          
            var u =users.filter(us=>us.id===user);
          
            var updatedvotes={...u[0].answers,[questionid]:'OptionTwo'}
            u[0]={...u[0],answers:updatedvotes};
           
            let indexofuser=users.findIndex((use)=>use.id===u[0].id)
             users={...users,[indexofuser]:u[0]};
             users = Object.values(users);
            
           
             dispatch(usersActions.getusers({users:users}))

            
             
           
            const updatedoption={...question[0].optionTwo,votes:votes};
            const updateanswer={...question[0],optionTwo:updatedoption};
             question={...question[0],optionTwo:updatedoption};
            
            const len=Answered.length;
             Answered={...Answered,[len]:updateanswer};
            
             let i=questions.findIndex((question)=>question.id===questionid)
             questions={...questions,[i]:question};
            
             questions = Object.values(questions);
            
             Answered = Object.values(Answered);
             unAnswered=unAnswered.filter((question)=>question.id!==updateanswer.id);
            dispatch(questionsActions.getquestions({questions:questions,answered:Answered,unAnswered:unAnswered}));
        }
        else{
            const votes=[...question[0].optionOne.votes,user];

            var requireduser =users.filter(us=>us.id===user);
          
            var updatedvote={...requireduser[0].answers,[questionid]:'OptionTwo'}
            requireduser[0]={...requireduser[0],answers:updatedvote};
           
            let indexofuser=users.findIndex((use)=>use.id===requireduser[0].id)
             users={...users,[indexofuser]:requireduser[0]};
             users = Object.values(users);
            
           
             dispatch(usersActions.getusers({users:users}))
           
            const updatedoption={...question[0].optionOne,votes:votes};
            const updateanswer={...question[0],optionOne:updatedoption};
             question={...question[0],optionOne:updatedoption};
            
            const len=Answered.length;
             Answered={...Answered,[len]:updateanswer};
            
             let i=questions.findIndex((question)=>question.id===questionid)
             questions={...questions,[i]:question};
            
             questions = Object.values(questions);
            
             Answered = Object.values(Answered);
             unAnswered=unAnswered.filter((question)=>question.id!==updateanswer.id);
            dispatch(questionsActions.getquestions({questions:questions,answered:Answered,unAnswered:unAnswered}));
          
        }
       

    }

    return (
    <div className={"card p-4 m-4   text-center"}>

        <div className={"row"}>
            
            <div className={"col-4 text-center"}> 
                <div className={"card border-0 "} style={{width: "15rem"}}>
                    <img className={"card-img-top rounded-circle "} src={avatarURL} alt="Card  cap"/>
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>{question.author}</h5>
                        
                    </div>
                
                </div>
            </div>

            <div className={"col-8 text-left "}>
            
                <form onSubmit={submitHandler} className={"card border-0 p-4 m-5"} >

                <p>Would you rather </p>                 
                    <div className={"form-check p-2  "}>
                        <input className={"form-check-input disabled"} type="radio" name="polloption" id="flexRadioDefault1"
                        ref={selectedOptionOne}
                        disabled={isAnswered? "disabled":''}
                        />
                        <label className={"form-check-label"} for="flexRadioDefault1">
                        {question[0].optionOne.text} 
                        </label>
                    </div>
                    <div className={"form-check p-2  "}>
                        <input className={"form-check-input "} type="radio"
                        disabled={isAnswered? "disabled":''} name="polloption"
                        ref={selectedOptionTwo}
                         id="flexRadioDefault2" />
                        <label className={"form-check-label"} for="flexRadioDefault2">
                        {question[0].optionTwo.text}
                        </label>
                    </div>

                    <button type="submit " disabled={isAnswered? "disabled":''} 
                    style={{width: "15rem"}} className={"btn btn-primary  mt-5"}>Submit</button>
                
                </form>
            </div>
        </div>
           

        {isAnswered && <p>{Summary}</p>} 

          
  </div>

    );
}

export default Question;