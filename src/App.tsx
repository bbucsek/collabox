import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`

function App() {
  return (
    <Container>
      Happy coding!
    </Container>
  );
}

export default App;
