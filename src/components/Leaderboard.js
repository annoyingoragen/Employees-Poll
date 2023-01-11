import { useSelector } from 'react-redux';
const LeaderBoard=()=>{
    const users=useSelector(state=>state.user.users);
    return(
        <div className={"card p-4 m-4   text-center"}>
        <h1>Unanswered Polls</h1>
        <ul>

                {
                    users.map((user=>{
                    return (<li key={user.id}  className="list-unstyled">
                        
                                <div className={"card p-4 m-4   h-100  text-center"} style={{ height: "1rem"}}>

                                    <div class="row">
                                        
                                        <div className={"col-4 text-center"}> 
                                            <div className={"card border-0 "} style={{width: "15rem"}}>
                                                <img style={{ height: "3rem", width:"3rem" }} className={"card-img-top rounded-circle rounded mx-auto d-block"} src={user.avatarURL} alt="Card  cap"/>
                                              
                                            </div>
                                        </div>

                                        <div className={"col-8 text-left"}>
                                        
                                        

                                            <p>{user.name}</p>    
                                           <p>Asked: {user.questions.length}</p>          
                                            <p>
                                            Answered: {Object.keys(user.answers).length}
                                            </p>

                                            
                                        
                                        </div>
                                    </div>
                                    
                                </div>


                            
                        </li>)
                    }))
                }
         </ul>
           

          
    </div>
    )

}
export default LeaderBoard;