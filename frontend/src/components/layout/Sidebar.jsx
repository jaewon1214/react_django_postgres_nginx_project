import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div``

const MenuButton = styled.button`
  position: fixed;
  top: 12px;
  left: 16px;
  z-index: 1001;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 8px;

  background: #334155;
  color: white;

  font-size: 22px;
  cursor: pointer;

  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

const Side = styled.aside`
  width: 220px;
  height: calc(100vh - 60px);

  background: #334155;

  position: fixed;
  top: 60px;
  left: 0;

  padding-top: 20px;

  transition: 0.3s;

  @media (max-width: 768px) {
    width: 200px;
    height: 100vh;

    top: 0;

    transform: ${({ open }) =>
      open ? 'translateX(0)' : 'translateX(-100%)'};

    z-index: 1000;
  }
`

const MenuLink = styled(Link)`
  display: block;

  color: white;
  text-decoration: none;

  padding: 16px 24px;

  &:hover {
    background: #475569;
  }
`

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <MenuButton onClick={() => setOpen(!open)}>
        ☰
      </MenuButton>

      <Side open={open}>
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/todo">할일</MenuLink>
        <MenuLink to="/employee">고용인 정보</MenuLink>
        <MenuLink to="/product">상품 정보</MenuLink>
        <MenuLink to="/sales">판매 정보</MenuLink>
      </Side>
    </Wrapper>
  )
}

export default Sidebar