import React from 'react'
import { signIn } from '../../service/authentication'
import { Container, Title, SignUp } from './styles'

export default function Login() {


  const handleClick = () => {
    signIn()
  }

  return (
    <Container>
      <Title>
        Collabox
      </Title>
      <SignUp onClick={handleClick}>Sign up with google</SignUp>
    </Container>)
}