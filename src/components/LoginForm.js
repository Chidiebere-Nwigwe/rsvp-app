import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
// import '../styles/LoginPage.css'

const LoginForm = () => {

    const {user , loading} = useAuth();

    const [error, setError] = useState('');

    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

     const navigate = useNavigate();

     if(loading) return <p>Loading...</p>;
     if (user) return <Navigate to='/admin' />;
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError('');

        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            console.log('Logged in user:', user);
            navigate('/admin'); 
        }
        catch(err){
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email.');
              } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
              } else {
                setError(err.message || 'Failed to sign in.');
              }
              console.error(err);
        }
    }


    const handleChange = (e) => {
        const {id , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id] : value
        }))
    }

  return (
    <div className="loginFormParentDiv">
        <div className="loginForm">
            <form className="mainLoginForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <br></br>
                    <input type='email' id='email' required  placeholder='Email' value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <br></br>
                    <input type='password' id='password' required placeholder='Password' value={formData.password} onChange={handleChange}  />
                </div>

                <button  type='submit' >Login</button>

            </form>
        </div>

        
        <p>Don't have an Admin Account, <Link to={`/signup`}>Sign up </Link></p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default LoginForm