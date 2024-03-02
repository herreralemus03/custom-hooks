import { useCallback, useReducer, useEffect, useState } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer'

const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || []
}

export const useTodo = (initialState = []) => {
  const [ todos, dispatchTodo ] = useReducer( todoReducer, initialState, init )
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])  

  const handleNewTodo = useCallback((todo) => {
    const action = {
        type: '[TODO] Add Todo',
        payload: todo
    }
    dispatchTodo(action)
  }, [])
    
  const onRemoveTodo = useCallback((todo) => {
    const action = {
        type: '[TODO] Remove Todo',
        payload: todo
    }
    dispatchTodo(action)
  }, [])

  const onToggleTodo = useCallback((todo) => {
    const action = {
        type: '[TODO] Toggle Todo',
        payload: todo
    }
    dispatchTodo(action)
  }, [])
  
  return {
    todos,
    pending: todos.filter(e => !e.done),
    handleNewTodo,
    onRemoveTodo,
    onToggleTodo,
  }
}
