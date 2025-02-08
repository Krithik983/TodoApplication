import React, { useState } from 'react'

const TodoCard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = { id: Date.now(), text: newTodo };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTodo(e);
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTodos(todos.map(todo => todo.id === currentTodo.id ? currentTodo : todo));
    setIsEditing(false);
  };

  const TodoItem = ({ todo }) => (
    <li key={todo.id} className='flex justify-between items-center text-white bg-gray-800 p-2 rounded-2xl'>
      <span>{todo.text}</span>
      <div>
        <button onClick={() => handleEdit(todo)} className='mr-2 bg-blue-400 text-white p-2 rounded cursor-pointer'>Edit</button>
        <button onClick={() => handleDelete(todo.id)} className='bg-red-600 text-white p-2 rounded cursor-pointer'>Delete</button>
      </div>
    </li>
  );

  return (
    <div className='bg-gray-700 border-2 border-gray-300 rounded-3xl p-4 w-150 h-100 m-8 gap-2'>
      <div className='flex row gap-3'>
        <input 
          value={newTodo} 
          type="text" 
          onChange={(e) => setNewTodo(e.target.value)} 
          onKeyDown={handleKeyDown} 
          className='border-gray-300 border-2 bg-amber-100 rounded-3xl w-3/4 h-10 text-xl p-3 outline-none' 
          placeholder='Enter your TODO here' 
        />
        <button onClick={handleAddTodo} className='border-2 border-green-300 bg-green-500 hover:bg-green-300 rounded-3xl w-1/4 h-10 cursor-pointer text-xl text-white'>Add</button>
      </div>
      <div className='w-full mt-8 h-64 overflow-y-auto'>
        <ul className='space-y-4'>
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      </div>

      {isEditing && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded-xl w-100'>
            <h2 className='text-xl mb-4'><b>Edit Todo</b></h2>
            <form onSubmit={handleEditSubmit}>
              <input 
                type="text" 
                value={currentTodo.text} 
                onChange={(e) => setCurrentTodo({ ...currentTodo, text: e.target.value })} 
                className='border-gray-300 border-2 bg-amber-100 rounded-3xl w-full h-10 text-xl p-3 outline-none mb-4' 
              />
              <center>
                <button type="submit" className='bg-green-500 text-white p-2 rounded cursor-pointer'>Submit</button>
                <button type="button" onClick={() => setIsEditing(false)} className='bg-red-500 text-white p-2 rounded ml-2 cursor-pointer'>Cancel</button>
              </center>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
