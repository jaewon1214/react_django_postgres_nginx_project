import React, { createContext, Children, useReducer } from 'react'

export const TodoContext = createContext();

const initalState = {
  todoList : [
    {id : 1, subject : "HTML 공부", checked : true},
    {id : 2, subject : "CSS 공부", checked : false},
    {id : 3, subject : "React 공부", checked : true},
    {id : 4, subject : "Python 공부", checked : false},
  ],
  todoObj : {id : "", subject : "", checked : false}
}

const reducer = (state,action) =>{
    switch(action.type){
        case "Toggle" :
            return{
                ...state,
               todoList: state.todoList.map(todo =>
                todo.id === action.payload
                 ? {...todo, checked: !todo.checked}
                : todo
                )
            }
        case "Update" :
            return{
                ...state,
                todoList: state.todoList.map(todo =>
                todo.id === action.payload.id
                ? {...todo, subject: value}
                : todo
            )
        }
        case "Delete" :
            return{
                ...state,
                todoList: state.todoList.filter(todo =>
                todo.id !== action.payload
            )
        }
        case "Register" :
            return{
                ...state,
                todoList: [
                    ...state.todoList,
                    {
                    ...state.todoObj,
                    id: state.todoList.length > 0
                        ? Math.max(...state.todoList.map(item => item.id)) + 1
                        : 1,
                    checked: false
                    }
                ],
                todoObj: {
                    id: "",
                    subject: "",
                    checked: false
                }
                        }
        case "change" :
            return{
                
            ...state,
            todoObj: {
            ...state.todoObj,
            [action.payload.name]: action.payload.value
            }
        }
            default :
            return state
    }
}

const TodoProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initalState)
  return (
    <TodoContext.Provider value={{state, dispatch}}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
