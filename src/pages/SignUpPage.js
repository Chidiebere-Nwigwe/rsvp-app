import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Header from '../components/Header'
import Banner from '../components/Banner'
import '../styles/SignUpPage.css'
import Button from "../components/Button";

const SignUpPage = () => {
  return (
    <div>
        <Button />
        <Banner />
        <Header>Sign Up</Header>
        <SignUpForm />
    </div>
  )
}

export default SignUpPage