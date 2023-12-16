import { useEffect, useState } from "react";
import "./Styles/LogIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const req_url = "https://localhost:7173/users/ValidateUser";

// A login function component responsible for user login against the server.
function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [submitButtonText, setSubmitButtonText] = useState("LOGIN");
    const allowSubmission = !emailError && !passwordError;
    const navigator = useNavigate();

    const isEmailValid = (email: string): boolean => {
        const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string): boolean => {
        const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};':\"\\\\|,.<>\\/?]{8,}$/;
        if(!passwordRegex.test(password)) {
            return false;
        }

        return true;
    };

    const handleEmailChange = (event: any): void => {
        setEmail(event.target.value)
    };

    const checkEmail = () => {
        const emailIsValid: boolean = isEmailValid(email);
        if(emailIsValid) {
            setEmailError(false);
        }
        else {
            setEmailError(true);
        }
    };

    const handlePasswordChange = (event: any): void => {
        setPassword(event.target.value)
    };

    const checkPassword = () => {
        const passwordIsValid: boolean = isPasswordValid(password);
        if(passwordIsValid) {
            setPasswordError(false);
        }
        else {
            setPasswordError(true);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmitButtonText("Loading...")
        axios.post(req_url, {email: email, password: password}).then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data));
            navigator("/info");
        }).catch((err) => {
            if (err.response && err.response.status === 422) {
                setResponseError(err.response.data);
                setSubmitButtonText("LOGIN");
            } else {
                console.log(`There is a problem - \n ${err}`);
            }
        });
    };

    useEffect(() => {
        checkEmail();
        checkPassword();
    }, [email, password, emailError, passwordError, submitButtonText]);

    return (
      <div className="login">
        <div className="image" />
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-container">
            <label htmlFor="email-input">Email address</label>
            <input name="email-input" className="login-input" type="text" placeholder="Enter your email here" value={email} onChange={handleEmailChange} required/>
            {emailError && email.length > 0 ? <div className="input-error">*Please enter a valid email address</div> : null}
          </div>

          <div className="login-container">
            <label htmlFor="password-input">Password</label>
            <input name="password-input" className="login-input" type="password" placeholder="Enter your password here" value={password} onChange={handlePasswordChange} required/>
            {passwordError && password.length > 0? <div className="input-error">*Please enter a valid password</div> : null}
          </div>

          <input className={`login-submit ${allowSubmission ? "login-submit-valid" : ""}`} type="submit" value={submitButtonText} disabled={allowSubmission ? false : true} />
          <div className="input-error">{ responseError }</div>
        </form>
      </div>
    );
  }
  
  export default LogIn;
  