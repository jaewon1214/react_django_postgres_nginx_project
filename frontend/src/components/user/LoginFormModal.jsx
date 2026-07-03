import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginUser } from '../../store/hooks/uesUser'
import styled from 'styled-components'
import { Modal, Input, Typography, Divider } from 'antd'

const {Title, Text} = Typography



const initialState = {
    username: "",
    password: ""
}

const LoginForm = ({open, setOpen}) => {
    const [user, setUser] = useState(initialState)
    const loginMutation = useLoginUser();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        //event.preventDefault();
        if(user.username.trim()===""){
            alert("이름을 넣어주세요!")
            return
        }
        if(user.password.trim()===""){
            alert("비밀번호를 넣어주세요!")
            return
        }

        if (user.username.trim()) {  
            try{
                await loginMutation.mutateAsync(user)
                alert("로그인 성공")
                setOpen(false)
                setUser(initialState)
                navigate('/')
            }catch(error){
                alert(error?.message || "로그인 실패")
            }     
            return  
        }
    }

    return (
        <>
            <Modal
                open={open}
                onOk={handleLogin}
                onCancel={()=>setOpen(false)}
                okText="로그인"
                cancelText="취소"
                confirmLoading={loginMutation.isPending}//ispending == loading
                width={450}
                centered
            >

                <Wrapper>
                    <Title>로그인</Title>
                    <div>
                        계정 정보를 입력해주세요
                    </div>
                    <Input
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder='사용자 이름'
                    />
                    <Input
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder='비밀번호'
                    />
                    <RegisterButton
                        type="button"
                        onClick={() => {
                            setOpen(false)
                            navigate("/")
                        }}
                    >
                        닫기
                    </RegisterButton>                    
                </Wrapper>
            </Modal>
        </>
    )
}
export default LoginForm

const Wrapper = styled.div`
    padding: 10px 0;    
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
const RegisterButton = styled(BaseButton)`
    background: transparent;

    color: #3b82f6;

    margin-top: 12px;

    &:hover{
        background: #eff6ff;
    }
`