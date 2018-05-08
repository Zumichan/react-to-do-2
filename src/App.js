import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
       todos: [
         { description: 'Walk the cat', isCompleted: true },
         { description: 'Throw the dishes away', isCompleted: false },
         { description: 'Buy new dishes', isCompleted: false }
       ],
        newTodoDescription: ''
     };
   }

   handleChange(e) {
     this.setState({ newTodoDescription: e.target.value })
   }

   handleSubmit(e) {
     e.preventDefault();
     if (!this.state.newTodoDescription) { return }
     const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
     this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
   }

   toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

   deleteTodo(index) {
     this.setState({ todos : this.state.todos.filter((todo, deleteIndex)=>index !== deleteIndex)})
   }

  render() {
    return (
      <div className="App">
        <div className="todo-border">
        <h1>React Todos</h1>
        <ul>
        { this.state.todos.map( (todo, index) =>
            <ToDo
              key={ index }
              description={ todo.description }
              isCompleted={ todo.isCompleted }
              toggleComplete={ () => this.toggleComplete(index) }
              deleteTodo={ () => this.deleteTodo(index) }
            />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
           <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } deleteTodo={ (index) => this.deleteTodo(index) }/>
           <input type="submit" className="btn btn-submit"/>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
