import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser, useLogout } from '../../store/hooks/uesUser'
import LoginFormModal from '../user/LoginFormModal'
import { useState } from 'react'
import RegisterFormModal from '../user/RegisterFormModal'


const Header = styled.header`
  height: 60px;
  background: #1e293b;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 30px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
`

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Button = styled.button`
  padding: 8px 14px;

  border: none;
  border-radius: 8px;

  background: white;

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;

  &:hover{
    opacity: 0.85;
  }
`

const UserText = styled.div`
  font-size: 15px;
  font-weight: 500;
`

const LogoutButton = styled(Button)`
  background: #ef4444;
  color: white;

  &:hover{
    background: #dc2626;
  }
`

const Headbar = () => {
  const navigate = useNavigate();
  const {data: user} = useCurrentUser();
  const logout = useLogout();
  const [loginOpen, setloginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false)
  const handleLogout = () => {
      logout();
    alert("로그아웃 되었습니다.")
    navigate("/")
  }

  return (
    <>
      <Header>
        <Logo onClick={() => navigate("/")}>
          Logo
        </Logo>
        <ButtonBox>
          {user ? (
            <>
              <UserText>
              {user.username} 안녕
              </UserText>

              <LogoutButton onClick={handleLogout}>
                로그아웃
              </LogoutButton>
            </>
          ) : (
            <>
              <Button onClick={() => setloginOpen(true)}>
                로그인
              </Button>

              <Button onClick={() => setRegisterOpen(true)}>
                회원가입
              </Button>
            </>
          )}
        </ButtonBox>
      </Header>
      <LoginFormModal
        open={loginOpen}
        setOpen={setloginOpen}
      />
      <RegisterFormModal
        open={registerOpen}
        setOpen={setRegisterOpen}
      />
    </>
    
  )
}

export default Headbar