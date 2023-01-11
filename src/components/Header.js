import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/Auth';
// import { authActions } from '../store';
import { Link,useNavigate} from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {

  const dispatch=useDispatch()
 
    const loggedUser=useSelector((state)=>state.auth.loggedUser);
    const avatarURL=useSelector((state)=>state.auth.avatarURL);
    const navigate = useNavigate();
    const logouthandler=()=>{
      dispatch(authActions.logout());
      navigate('/')
    }
  


  return (
    <header className={classes.header }>
      <h3>Employee Poll App</h3>
      { 
      (<nav>
        <ul>
          <li>
          
          <Link  to="/" >Home      </Link>
          </li>  
    
          <li>
            <Link to='addquestion'>Add Question</Link>
          </li>

          <li>
          <Link  to="leaderboard" >LeaderBoard</Link>
          </li>

          <li>
             <button className="nav-link "  >
                <img src={avatarURL} alt='User_Profile_Photo' width="40" height="40" className={"rounded-circle"} ></img>{loggedUser}
            </button>
          </li>
          <li>
              <button onClick={logouthandler} >Logout</button>
          </li>
        </ul>
      </nav>)
      }
    </header>
  );
};

export default Header;
