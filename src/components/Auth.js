import { useDispatch } from 'react-redux';
// import { authActions } from '../store';
import { useRef, useState } from 'react';
import { _getUsers } from '../_DATA';
import classes from './Auth.module.css';
import { authActions } from '../store/Auth';

const Auth = () => {
  const idRef = useRef('sarahedo');
  const passwordRef = useRef('123');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async (e) => {
    e.preventDefault()

    let id = idRef.current.value;
    let password = passwordRef.current.value;

    if (id.length === 0 || password.length === 0) {
      setError(true);
    }
    else {
      setError(false);
    }

    const response = await _getUsers();

    // const data=await  response;

    const users = Object.values(response);
    const user = users.filter((user) => user.id === id && user.password === password)
    // console.log(user)   
    if (user) {
      dispatch(authActions.login({ name: user[0].name, avatarURL: user[0].avatarURL, id: user[0].id }))
    }

  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={authHandler}>

          {error && <div className="alert alert-danger" role="alert"> Invalid Input</div>}
          <div className={classes.control}>
            <label htmlFor='id'>ID</label>
            <input type='text' value="sarahedo" ref={idRef} id='id' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' value="123" ref={passwordRef} id='password' />
          </div>
          <button >Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
