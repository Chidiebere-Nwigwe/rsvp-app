import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 


const SignUpForm = () => {

    const { user, loading } = useAuth();

     const [error, setError] = useState('');

     const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (user) return <Navigate to="/admin" />;

    const handleChange = (e) => {
        const {id , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id] : value
        }))
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setError('');
        try{
            // signin up with firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )

            const user = userCredential.user;

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: formData.name,
                email: formData.email,
                timestamp: new Date()
              });
            
              setFormData({ name: '', email: '', password: ''});
              navigate('/admin');
        }
        catch(err){
            setError(err.message || 'Failed to create account.')
            console.error(err);
        }
    }

  return (
    <div className="signupFormParentDiv">
        <div className="signupForm">
            <form className="mainSignupForm" onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='name'>Name:</label>
                    <br></br>
                    <input type='name' id='name' required  placeholder='Name' value={formData.name} onChange={handleChange} />
                </div>

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

                <button type='submit'>Sign up</button>
            </form>

        </div>
        <p>Don't have an Admin Account, <Link to={`/signin`}>Sign in </Link></p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SignUpForm
