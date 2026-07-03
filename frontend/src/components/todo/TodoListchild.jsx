import React, { useState } from 'react'
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from "react-icons/md"
//import { useDispatch } from 'react-redux'
import styled from 'styled-components'
//import { todoPutSlice, todoAllGetSlice, todoDeleteSlice, todoToggleSlice, Updata } from '../../no3_store/slices/todoSlice'
import { useDeleteTodo, useGetTodo, usePutUpdateTodo } from '../../store/hooks/useTodo'

const TodoListchild = ({item}) => {
  //const dispatch = useDispatch();
  //const toggleMutation = usePutToggleTodo();
  const updateMutation = usePutUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const {data : newTodo, isLoadin, error} = useGetTodo(item.id)

  const [editing, setEditing] = useState(false)
  const [todo, setValue] = useState(item);

  const handleUpdate = () => {
    if (todo.subject !== ""){
      try{
        updateMutation.mutate(todo);
        setEditing(false)
        alert("수정 성공")
      }catch{
        alert("수정 실패")
      }
    }
  }

  const handleToggle = () => {
    try{
      setValue(prev => ({...prev, checked: !todo.checked}))
      updateMutation.mutateAsync({...todo, checked: !todo.checked});
      setEditing(false)
    }catch{
      alert("에러")
    }
  }

  const handleEditStart = () => {
    setValue(item)
    setEditing(true)
  }

  return (
    <ItemBox $checked={todo.checked}>
      <CheckIcon onClick={handleToggle}>
        {
          todo.checked
            ? <MdCheckBox />
            : <MdCheckBoxOutlineBlank />
        }
      </CheckIcon>

      <TextBox>
        {
          editing ? (
            <EditInput
              type="text"
              name="subject"
              value={todo.subject}
              onChange={(e) => setValue(prev => ({...prev, [e.target.name] : e.target.value}))}
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if(e.key === "Enter") handleUpdate()
              }}
              autoFocus
            />
          ) : (
            <TodoText
              $checked={todo.checked}
              onDoubleClick={handleEditStart}
            >
              {item.subject}
            </TodoText>
          )
        }
      </TextBox>

      <DeleteIcon onClick={()=> deleteMutation.mutateAsync(item.id)}>
        <MdRemoveCircleOutline />
      </DeleteIcon>
    </ItemBox>
  )
}

export default TodoListchild

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 16px 18px;

  border-radius: 16px;

  background: ${({$checked}) => $checked ? "#f1f5f9" : "#ffffff"};

  border: 1px solid ${({$checked}) => $checked ? "#cbd5e1" : "#e2e8f0"};

  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);

  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
  }
`

const CheckIcon = styled.div`
  display: flex;
  align-items: center;

  font-size: 28px;
  color: #2563eb;

  cursor: pointer;
`

const TextBox = styled.div`
  flex: 1;
`

const TodoText = styled.div`
  font-size: 17px;
  font-weight: 500;

  color: ${({$checked}) => $checked ? "#94a3b8" : "#0f172a"};

  text-decoration: ${({$checked}) => $checked ? "line-through" : "none"};

  cursor: pointer;

  user-select: none;
`

const EditInput = styled.input`
  width: 100%;

  padding: 10px 12px;

  border: 1px solid #2563eb;
  border-radius: 10px;

  font-size: 16px;

  outline: none;

  box-sizing: border-box;
`

const DeleteIcon = styled.div`
  display: flex;
  align-items: center;

  font-size: 26px;
  color: #ef4444;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    color: #dc2626;
    transform: scale(1.15);
  }
`