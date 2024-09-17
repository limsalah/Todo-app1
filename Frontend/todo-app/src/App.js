import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import TodoList from './components/TodoList'; 
import AddTodo from './components/AddTodo'; 
function App() { 
const [todos, setTodos] = useState([]); 
// Fetch todos from backend 
useEffect(() => { 
axios.get('http://localhost:5000/todos') 
.then((response) => { 
setTodos(response.data); 
}) 
.catch((error) => console.error('Error fetching todos:', error)); 
}, []); 
// Add a new todo 
const addTodo = (task) => { 
axios.post('http://localhost:5000/todos', { task }) 
.then((response) => { 
setTodos([...todos, response.data]); 
}) 
.catch((error) => console.error('Error adding todo:', error)); 
}; 
// Mark todo as completed 
const toggleComplete = (index) => { 
const todo = todos[index]; 
axios.put(`http://localhost:5000/todos/${todo.id}`, { completed: !todo.completed }) .then(() => { 
const newTodos = [...todos]; 
newTodos[index].completed = !newTodos[index].completed; 
setTodos(newTodos); 
}) 
.catch((error) => console.error('Error updating todo:', error)); 
}; 
// Delete a todo 
const deleteTodo = (index) => { 
const todo = todos[index]; 
axios.delete(`http://localhost:5000/todos/${todo.id}`) 
.then(() => { 
const newTodos = todos.filter((_, i) => i !== index); 
setTodos(newTodos); 
}) 
.catch((error) => console.error('Error deleting todo:', error)); 
}; 
return ( 
<div className="App">
<h1>To-Do App</h1> 
<AddTodo addTodo={addTodo} /> 
<TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} /> </div> 
); 
} 
export default App; 
