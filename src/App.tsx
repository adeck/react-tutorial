import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';

// Following this tutorial:
//
//  https://www.youtube.com/watch?v=b9eMGE7QtTk
//

//function App() {
//  return (
const App = () => {
  const [counter, setCounter] = useState(0);
  const todoListItems = [
    {summary: 'eat fruit', description: 'have a pear or something'},
    {summary: 'toast a nut', description: 'toss a peanut into an open flame'},
  ];
  useEffect(() => {
    setCounter(30);
  }, []);
  useEffect(() => {
    alert('you changed counter to ' + counter);
  }, [counter]);
  const name = '<a>my friend</a>';
  const greeting = <p>Say hello to {name.toUpperCase()}</p>;
  const update = (val: number) => (() => setCounter((prev) => prev + val));
  return (
      <div className="App">
        <button onClick={update(1)}>+</button>
        <h1>{counter}</h1>
        <button onClick={update(-1)}>-</button>
        <header className="App-header">
          {greeting}
          <p>
            Edit <code>src/App.tsx</code> and save to reload. Or don't.
          </p>
          <ol>
            {todoListItems.map((e) => (
                <TodoListItem summary={e.summary} description={e.description}/>
            ))}
          </ol>
        </header>
      </div>
  );
};

const TodoListItem = (props: any) => {
  return (
      <li>
        <p>{props.summary}</p>
        <p>{props.description}</p>
      </li>
  );
};

export default App;
