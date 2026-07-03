import React from 'react'
import { useState } from 'react'
import Todotemplet from '../components/todo/Todotemplet'
import Todoinsert from '../components/todo/Todoinsert'
import TodoList from '../components/todo/TodoList'

const TodoPage = () => {

  return (
    <Todotemplet>
      <Todoinsert />
      <TodoList />
    </Todotemplet>
  )
}

export default TodoPage
