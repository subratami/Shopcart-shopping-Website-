import { Link } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  return (
    <>
    
    <div className="login-container">
      <div className="auth-form">
        <p style={{padding: '10px'}}>New User? <Link to="/signup">Sign Up</Link></p>
        <h2>Log In</h2>
        <form>
          <label title='Email Address'>Email Address</label>
          <input placeholder="Email" type="text" required />

          <label title='Password'>Password</label>
          <input placeholder="Password" type="Password" required />

          <button type="submit">LOG IN</button>
          <p><a href="#">Forget Password?</a></p>
        </form>
        <div className="social-login">
          <p>or</p>
          <button className="google-login">Google</button>
          <button className="apple-login">Apple</button>
        </div>
      </div>

      </div>
    </>
  );
}

export default Login;
