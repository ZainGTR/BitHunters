import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './tabs.css'
import { Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'





function Tabs() {
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState(null)
    const [balance, setBalance] = useState(null)

    chrome.storage.session.get(["accesstoken"]).then((result) => {
        if (!result.accesstoken) {
            setConnected(false)
        } else {
            setConnected(true)
            setUsername(result.accesstoken.username)
            setBalance(result.accesstoken.balance)
        }
        
      });

      const refresh = () => window.location.reload()

      const HandleLogout = () => {
        chrome.storage.session.remove("accesstoken").then(() => {
            console.log("Logged out");
            refresh();
        });
      }
    
    return (
        <div>
            <div className='navbar'>
                <div className='navlinks'>
                    
                            <Link to="/">Home</Link>
                        
                            
                     
                        <Link to="/dashboard"> {connected? 'Dashboard': 'Login'}</Link>

                </div>
                <div className='usernav'>
                    <div className='user'>
                        <p>{username}</p>
                        <p>{balance && balance.toPrecision(3)}</p>
                        
                    </div>
                    {connected && <button className='logoutbtn' onClick={HandleLogout}>Logout</button>}
                </div>
                
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default Tabs