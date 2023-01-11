// import { Fragment } from "react";
import Header from "./components/Header";
import {   Routes,BrowserRouter,Route} from 'react-router-dom';
import Auth from "./components/Auth";
import { useSelector,useDispatch } from 'react-redux';
// import Question from "./components/Question";
import Questions from "./components/Questions";
import { questionsActions } from './store/Questions';
import { usersActions } from "./store/Users";
import { useEffect } from "react";
import {_getQuestions,_getUsers} from './_DATA'
import Question from "./components/Question";
import LeaderBoard from "./components/Leaderboard";
import AddQuestion from "./components/AddQuestion";



function App() {
  const dispatch=useDispatch();
  const userid=useSelector(state=>state.auth.id)

  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  useEffect(()=>{

    async function fetchData(){
    const response=  await _getQuestions();            
    const questions=Object.values(response);
    
    const users = await _getUsers();

    // const data=await  response;

    const userslist = Object.values(users);
    dispatch(usersActions.getusers({users:userslist}))

    const Answered=questions.filter((question)=>question.optionOne.votes.includes(userid)||question.optionTwo.votes.includes(userid))
 

   const unAnswered=questions.filter((question)=>!question.optionOne.votes.includes(userid)&&!question.optionTwo.votes.includes(userid))
//    console.log(unAnswered)
   dispatch(questionsActions.getquestions({questions:questions,answered:Answered,unAnswered:unAnswered}));
   
    }
    fetchData();
   
},[userid,dispatch]);
  return (
    
    <BrowserRouter>
   { isAuthenticated && <Header />}
    <Routes>
        {!isAuthenticated && <Route path="/" element={<Auth />} />}
        { isAuthenticated && <Route path="addquestion" element={<AddQuestion />} />}
        { isAuthenticated && <Route path="/" element={<Questions/>} />}
        { isAuthenticated && <Route path="question" element={<Question />} />}
        { isAuthenticated &&  <Route path="leaderboard" element={<LeaderBoard />} />}
    </Routes>
  </BrowserRouter>
   
     
    

  );
}

export default App;
