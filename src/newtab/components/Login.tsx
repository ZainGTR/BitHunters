import React, { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [username, setUsername] = useState(null)
    const [otpcode, setOtpcode] = useState(null)
    const [error, setError] = useState(null)
    const [register, setRegister] = useState(false)
    const [forgot, setForgot] = useState(false)
    const [otpmode, setotpmode] = useState(false)
    const [emailTimer, setEmailTimer] = useState(null)

    const navigate = useNavigate()
    const refresh = () => window.location.reload()
    chrome.storage.session.get(["accesstoken"]).then((result) => {
        if (result.accesstoken) {
            return navigate('/dashboard');
        }
        console.log(result.accesstoken);
    });
    
    const NewRequest = axios.create({
        baseURL: "http://localhost:8800/api/",
        withCredentials: true
    });

    function setFocus(props) {
        document.getElementById(props).focus();
        if (props === 'otpinpt') {
            (document.getElementById('optbutton') as HTMLButtonElement).type = "button";
            
        }
    }
      
    function removeFocus(props) {
        document.getElementById(props).blur();
    }

    function disablebtn(){
        var wait_time = 1 * 60 * 1000; // in milliseconds
        var start_time = performance.now();
        (document.getElementById("optbutton") as HTMLButtonElement).disabled = true;
        
        var interval = setInterval(function(){
            var time_left = wait_time - (performance.now() - start_time);
            var minutes = Math.floor(time_left / 1000 / 60);
            var seconds = Math.floor((time_left - minutes*1000*60)/1000);
            var seconds_str = seconds.toString().padStart(2,'0');
            setEmailTimer(minutes + ':' + seconds_str);
            if(time_left <= 0){
                (document.getElementById("optbutton") as HTMLButtonElement).disabled = false;
                clearInterval(interval);
                setEmailTimer("")
              }
        }, 250)

        
    }

    useEffect(() => {
      if(register) {
        setForgot(false);
        setFocus("signupinpt");
      }else {
        setFocus("logininpt");
      }
      if(forgot) {
        setEmail(null)
        setFocus("forgotinpt");
      }
      

    }, [register, forgot])
    

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const res = await NewRequest.post("/auth/login", {email, password});
    
            chrome.storage.session.set({ accesstoken: res.data }).then(() => {
                console.log("Value was set");
                refresh()
              });
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }

    }
    const HandleRegister = async (e) => {
        e.preventDefault()
        try {
            
            const res = await NewRequest.post("/auth/register", {username, email, password});
            setError(null);
            console.log(res);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }

    }
    const HandleForgot = async (e) => {
        e.preventDefault()
        try {
            console.log("forgot submit")
            console.log(otpcode, email)
            const res = await NewRequest.post("/users/reset/otp", {otpcode, email, password});
            setError(null);
            console.log(res);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }

    }
    const HandleOTP = async (e) => {
        e.preventDefault()
        try {
            
            const res = await NewRequest.post("/users/reset", {email});
            setError(null);
            console.log(res);
            setotpmode(true);
            setFocus("otpinpt");
            disablebtn();
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }

    }
  return (
    <div className='main'>
        <div className='login'>

        <form className={register? 'hide':forgot? 'hide' : 'activeform'} onSubmit={HandleSubmit}>
            <h1>Welcome back.</h1>
            <label htmlFor="email"> Email</label>
            <input id='logininpt' required name="email" type="email" onChange={e=>setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" onChange={e=>setPassword(e.target.value)} />
            <a  onClick={e=>setForgot(true)} className='forgot'>Forgot your password?</a>
            <p className='error'>{error}</p>
            <button type='submit'> Login</button>
            <div className='welcomemsg'>

            <h4>You don't have an account yet?</h4>
            <a className='switchtext' onClick={e=>setRegister(true)}>Signup</a>
                 
            </div>
        </form>
        <form className={register? 'activeform': 'hide'} onSubmit={HandleRegister}>
            <h1>Join the hunters.</h1>
            <label htmlFor="username"> Username</label>
            <input id='signupinpt' required name="username" type="name" onChange={e=>setUsername(e.target.value)} />
            <label htmlFor="email"> Email </label>
            <input required name="email" type="email" onChange={e=>setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" onChange={e=>setPassword(e.target.value)} />
            <p className='error'>{error}</p>
            <button type='submit'> Signup</button>
            <div className='welcomemsg'>
                <h4>Already have an account?  </h4>
                <a className='switchtext' onClick={e=>setRegister(false)}>Login</a>
            </div>
        </form>
        <form className={register? 'hide':forgot? 'activeform': 'hide'} onSubmit={HandleForgot}>
            <h1>{otpmode? 'Check your email.' : 'Enter your email address.'}</h1>
            <label  htmlFor="email"> Email</label>
            <input  id='forgotinpt' required name="email" type="email" onChange={e=>setEmail(e.target.value)} />
            <button id='optbutton' onClick={HandleOTP}> {otpmode? `Resend OTP ${emailTimer && emailTimer}` : 'Send OTP'}</button>
            <div className={otpmode? 'activeform': 'hide'}>
            <label htmlFor="otp">OTP CODE</label>
            <input id='otpinpt' required name="otp" type="number" onChange={e=>setOtpcode(e.target.value)} />
            <label htmlFor="password">New Password</label>
            <input required name="password" type="password" onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className={otpmode? '': 'hide'} type='submit'> Reset my password</button>
            <p className='error'>{error}</p>
            <div className='welcomemsg'>
            <h4>You don't have an account yet?</h4>
            <a className='switchtext' onClick={e=>setRegister(true)}>Signup</a>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login