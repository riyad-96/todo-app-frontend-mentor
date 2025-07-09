import { useEffect, useRef, useState } from 'react';
import EachList from '../components/EachList';

const activePlaceholder = ['No active tasks. Take a deep breath.', 'All tasks are done. Add more when ready.', 'You’re free right now. What’s next?', 'No active todos. Enjoy your peace 🕊️.', 'Nothing left here! Feeling productive?'];

function Active({ todos, func, isThemeDark }) {
  const { completedFunc, removeTodoFunc } = func;
  const [activeTodos, setActiveTodos] = useState(todos);

  useEffect(() => {
    setActiveTodos(todos.filter((todo) => todo.completeState === false));
  }, [todos]);

  const random = useRef(Math.floor(Math.random() * activePlaceholder.length));

  return (
    <div className="">
      {activeTodos.map((todo) => (
        <EachList key={todo.id} todo={todo} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />
      ))}
      {activeTodos.length < 1 && (
        <div className="grid h-[65px] place-items-center border-b-1 border-(--todo-border-clr)">
          <span className="text-(--dark-grayish-blue)">{activePlaceholder[random.current]}</span>
        </div>
      )}
    </div>
  );
}

export default Active;
