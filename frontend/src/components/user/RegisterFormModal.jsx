import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useRegisterUser } from '../../store/hooks/uesUser'
import { Modal, Input, Typography } from 'antd'

const {Title} = Typography

const initialState = {
    username: "",
    password: "",
    confirmpassword: "",
    age: "",
    email: "",
    city: "",
}

const RegisterForm = ({open, setOpen}) => {
    const [user, setUser] = useState(initialState);
    const registerMutation = useRegisterUser();
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRegister = async () => {
        const {
            username,
            password,
            confirmpassword,
            email
        } = user
        if(!username.trim()){
            alert("아이디를 입력하세요")
            return;
        }

        if(!password.trim()){
            alert("비밀번호를 입력하세요")
            return;
        }

        if (password !== confirmpassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        if(!email.trim()){
            alert("이메일를 입력하세요")
            return;
        }

        const { confirmpassword:_, ...userData} =user
        try{
            registerMutation.mutateAsync(userData)
            alert("회원가입이 완료되었습니다.")
            setOpen(false)
            setUser(initialState)
            navigate('/')
        }catch(error){
            alert(error?.message || "회원가입이 실패.")
        }
    }

    return (
        <>
            <Modal
                open={open}
                onOk={handleRegister}
                onCancel={()=>setOpen(false)}
                okText="회원가입"
                cancelText="취소"
                confirmLoading={registerMutation.isPending}
                width={500}
                centered
            >
                <Wrapper>
                    <Title>회원가입</Title>
                    <SubTitle>새 계정을 등록해주세요</SubTitle>
                    <Input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="사용자 이름"
                    />
                    <Input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    <Input
                        type="password"
                        name="confirmpassword"
                        value={user.confirmpassword}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                    />
                    <Input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        placeholder="나이 입력"
                    />
                    <Input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="이메일 입력"
                    />
                    <Input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        placeholder="도시"
                    />
                </Wrapper>
            </Modal>
        </>
    )
}

export default RegisterForm

const Wrapper = styled.div`
    padding: 10px 0;
`


const SubTitle = styled.p`
    text-align: center;
    color: #64748b;
    font-size: 15px;
    margin-bottom: 32px;
`


const BaseButton = styled.button`
    width: 100%;
    padding: 15px;

    border: none;
    border-radius: 12px;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;
    transition: 0.2s;
`
