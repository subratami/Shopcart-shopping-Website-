import {Link} from 'react-router-dom';
import './signup.css'; 

const Signin = () => {
  return (
    <>
    
    <div className="Signup-container">
      <div className="auth-form">
        <p style={{padding: '10px'}}>Already have an account? <Link to="/login">Log In</Link></p>
        <h2>Create Account</h2>
        <form>
            <label>Name</label>
          <input type="name" required />
          
          <label>Email Address</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <label>Confirm Password</label>
          <input type="password" required />

          <button type="submit">SIGN UP</button>
           <input style={{width: '10%'}} type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a></label>
          <p>By signing up, you agree to our <a href="#">Privacy Policy</a>.</p> 
        </form>
        <div className="social-login">
          <p>or</p>
          <button className="google-signup">Signup with Google</button>
          <button className="apple-signup">Signup with Apple</button>
        </div>
      </div>

      </div>
    </>
  );
}

export default Signin;
