import React from 'react'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
import Banner from '../components/Banner'
import '../styles/LoginPage.css'
import Button from "../components/Button";

const LoginPage = () => {
  return (
    <div>
        <Button />
        <Banner />
        <Header>Sign in</Header>
        <LoginForm />
    </div>
  )
}

export default LoginPage