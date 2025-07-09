import { useRef } from 'react';
import EachList from '../components/EachList';

const todoPlaceholders = ['Got something to do? Drop it here.', 'What’s on your mind today?', 'No tasks yet. Let’s get productive!', 'Tap here to add your todo magic.', 'Add something you’ll finish today.', 'Ready, set, add a todo!', 'Your todo list starts here.'];

function All({ todos, func, isThemeDark }) {
  const { completedFunc, removeTodoFunc } = func;

  const random = useRef(Math.floor(Math.random() * todoPlaceholders.length));

  return (
    <div>
      {todos.map((todo) => (
        <EachList key={todo.id} todo={todo} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />
      ))}
      {todos.length < 1 && (
        <div className="grid h-[65px] place-items-center border-b-1 border-(--todo-border-clr)">
          <span className="text-(--dark-grayish-blue)">{todoPlaceholders[random.current]}</span>
        </div>
      )}
    </div>
  );
}

export default All;
