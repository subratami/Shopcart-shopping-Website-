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
          <input placeholder="Name" type="name" required />
          
          <label>Email Address</label>
          <input placeholder='Email' type="email" required />

          <label>Password</label>
          <input placeholder='Password' type="password" required />

          <label>Confirm Password</label>
          <input placeholder='Password' type="password" required />

          <button type="submit">SIGN UP</button>
           <input style={{width: '10%'}} type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a></label>
          <p>By signing up, you agree to our <a href="#">Privacy Policy</a>.</p> 
        </form>
        <div className="social-login">
          <p>or</p>
          <button className="google-signup">Google</button>
          <button className="apple-signup">Apple</button>
        </div>
      </div>

      </div>
    </>
  );
}

export default Signin;
