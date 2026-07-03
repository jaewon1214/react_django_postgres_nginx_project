import React from 'react'
import styled from 'styled-components'

const Todotemplet = ({children}) => {
  return (
    <Container>
      <TodoBox>
        <Title>일정관리</Title>
        <Content>
          {children}
        </Content>
      </TodoBox>
    </Container>
  )
}

export default Todotemplet

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding-top: 100px;

  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
`

const TodoBox = styled.div`
  width: 520px;

  background: white;

  border-radius: 24px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);

  overflow: hidden;
`

const Title = styled.div`
  padding: 28px;

  background: #2563eb;
  color: white;

  font-size: 28px;
  font-weight: 700;

  text-align: center;
`

const Content = styled.div`
  padding: 24px;
`