import { useEffect, useRef, useState } from 'react';
import EachList from '../components/EachList';

const completedPlaceholder = ['You haven’t completed any tasks yet.', 'No completed tasks yet. Let’s go!', 'Nothing completed yet. You got this 💪.', 'No victories here yet. Keep going.', 'Complete a task to see it here!'];

function Completed({ todos, func, isThemeDark }) {
  const { completedFunc, removeTodoFunc } = func;
  const [completedTodos, setCompletedTodos] = useState(todos);

  useEffect(() => {
    setCompletedTodos(todos.filter((todo) => todo.completeState === true));
  }, [todos]);

  const random = useRef(Math.floor(Math.random() * completedPlaceholder.length));

  return (
    <div className="">
      {completedTodos.map((todo) => (
        <EachList key={todo.id} todo={todo} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />
      ))}
      {completedTodos.length < 1 && (
        <div className="grid h-[65px] place-items-center border-b-1 border-(--todo-border-clr)">
          <span className="text-(--dark-grayish-blue)">{completedPlaceholder[random.current]}</span>
        </div>
      )}
    </div>
  );
}

export default Completed;
