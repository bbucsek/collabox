import React from 'react'
import { signIn } from '../../service/authentication'
import { Container } from './styles'

export default function Login() {


  const handleClick = () => {
    signIn()
  }

  return (
    <Container>
        <button onClick={handleClick}>Sing up with google</button>
    </Container>)
}