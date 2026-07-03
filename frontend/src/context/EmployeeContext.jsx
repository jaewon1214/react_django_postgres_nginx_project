import React, { createContext, useReducer } from 'react'

export const EmployeeContext = createContext();

const initialEmps = [
  {id : "1", name: "John", email: "John4454@example.com", job : "frontend", pay : 600 },
  {id : "2", name: "Peter", email: "Peter4454@example.com", job : "backend", pay : 601 },
  {id : "3", name: "Susan", email: "Susan4454@example.com", job : "db", pay : 602 },
  {id : "4", name: "sue", email: "Sue4454@example.com", job : "ai", pay : 603 }
]

const initialEmp = {
  id : '', name : '',email : '', job: '',pay : ''
}

const initalState = {
  empTable:initialEmps,
  emp: initialEmp,
  mode : '',
  selectedId: ""
}

const reducer = (state, action) =>{
  switch(action.type){
    case "select" : 
      return {
        ...state,
        selectedId: action.payload
      }
    case "set_emp" : 
      return {
        ...state,
        emp: action.payload
      }
    case "register" :
      return {
        ...state,
        empTable: [
          ...state.empTable,
          {
            ...action.payload.emp,
            id: action.payload.newId
          }
        ]
      }
    case "update":
      return {
        ...state,
        empTable: state.empTable.map(item =>
          item.id === state.selectedId ?
          action.payload : item
        )
      }
    case "delete" :
      return{
        ...state,
        empTable: state.empTable.filter(item =>
          item.id !== state.selectedId
        )
      }
    case "mode" :
      return{
        ...state,
        mode: action.payload
      }
    default : 
      return state;
  }
}


const EmployeeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <EmployeeContext.Provider value={{state,dispatch}}>
        {children}
      
    </EmployeeContext.Provider>
  )
}

export default EmployeeProvider
