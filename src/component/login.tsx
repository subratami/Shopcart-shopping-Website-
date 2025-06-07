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
          <label>Email Address</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <button type="submit">LOG IN</button>
          <p><a href="#">Forget Password?</a></p>
        </form>
        <div className="social-login">
          <p>or</p>
          <button className="google-login">Login with Google</button>
          <button className="apple-login">Login with Apple</button>
        </div>
      </div>

      </div>
    </>
  );
}

export default Login;
