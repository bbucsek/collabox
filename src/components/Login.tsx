import React from 'react'
import { signIn } from '../service/authentication'

export default function Login() {


  const handleClick = () => {
    signIn()
  }

  return (
    <>
        <button onClick={handleClick}>Sing up with google</button>
    </>)
}