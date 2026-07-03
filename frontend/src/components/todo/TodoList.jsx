import React, {useEffect} from 'react'
import styled from 'styled-components'
import TodoListchild from './TodoListchild'
import { useSearchParams } from 'react-router-dom'
import { useAllGetTodo } from '../../store/hooks/useTodo'

const TodoList = () => {
  const {data: todoList=[], isLoading, error} = useAllGetTodo();
  //const { todoList } = useSelector(state=>state.todo);
  //const dispatch = useDispatch();
  if(isLoading) return <h3>직원 정보를 불러오는 중...</h3>  //
  if(error) return <h3>에러 발생: {error.message}</h3>  //
 /* useEffect(()=>{
    dispatch(todoAllGetSlice())
  },[dispatch, todoList])*/
 
  return (
    <ListBox>
      {todoList?.map(item => (
        <TodoListchild
          key={item.id}
          item={item}
        />
      ))}
    </ListBox>
  )
}

export default TodoList

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`