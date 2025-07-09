import { useEffect, useRef, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import All from './pages/All';
import Active from './pages/Active';
import Completed from './pages/Completed';
import Background from './components/Background';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [input, setInput] = useState('');

  // Theme
  const [isThemeDark, setIsThemeDark] = useState(() => {
    const darkTheme = localStorage.getItem('isThemeDark');
    if (darkTheme !== null) {
      return JSON.parse(darkTheme);
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  const firstRender = useRef(true);
  const autoChange = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (autoChange.current) return;
    localStorage.setItem('isThemeDark', isThemeDark);
  }, [isThemeDark]);

  useEffect(() => {
    function handleAutoThemeChange() {
      autoChange.current = true;
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('isThemeDark');
      if (savedTheme !== null) return;
      if (isDark) {
        setIsThemeDark(true);
      } else {
        setIsThemeDark(false);
      }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleAutoThemeChange);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleAutoThemeChange);
    };
  }, []);

  function handleTheme() {
    autoChange.current = false;
    setIsThemeDark((prev) => !prev);
  }

  // Add todos
  function addTodos() {
    if (!input.trim()) return;

    const todo = {
      id: new Date().getTime(),
      task: input,
      completeState: false,
    };

    setTodos((prev) => [...prev, todo]);
    setInput('');
  }

  function keyboardShortcut(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodos();
    }
  }

  function completedFunc(id) {
    setTodos((prev) => prev.map((obj) => (obj.id === id ? { ...obj, completeState: !obj.completeState } : obj)));
  }

  function removeTodoFunc(id) {
    setTodos((prev) => prev.filter((obj) => obj.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completeState));
  }

  return (
    <div data-theme={isThemeDark && 'dark'} className="font-josefin relative h-screen max-h-screen overflow-hidden text-lg">
      <Background isThemeDark={isThemeDark} />

      <div className="relative z-1 h-screen max-h-screen overflow-y-auto">
        <main className="mx-auto box-content max-w-[540px] px-6 py-16">
          <header className="flex h-[100px] items-center justify-between">
            <h1 className="text-[2.325rem] font-bold tracking-[0.925rem] text-white">TODO</h1>
            <button type="button" aria-label="Theme switcher button" onClick={handleTheme} className="relative grid size-10 cursor-pointer place-items-center rounded-full transition-colors duration-200 hover:bg-white/10">
              {isThemeDark ? sunSvg() : moonSvg()}
            </button>
          </header>

          <div className="space-y-6 text-(--text-clr)">
            <div className="flex h-[65px] items-center gap-6 rounded-md bg-(--todo-body-bg) px-6 shadow-xl shadow-black/5">
              <div onClick={addTodos} className="size-[25px] cursor-pointer rounded-full border border-(--check-border-clr)"></div>
              <input value={input} onKeyDown={keyboardShortcut} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Create a new todo..." className="h-[40px] flex-1 text-lg outline-none" />
            </div>

            <div className="rounded-md bg-(--todo-body-bg) shadow-xl shadow-black/10">
              <div>
                <Routes>
                  <Route path="/" element={<All todos={todos} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />}></Route>
                  <Route path="/active" element={<Active todos={todos} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />}></Route>
                  <Route path="/completed" element={<Completed todos={todos} func={{ completedFunc, removeTodoFunc }} isThemeDark={isThemeDark} />}></Route>
                </Routes>
              </div>

              <div className="flex h-[50px] items-center justify-between px-6 text-(--nav-btn-text-clr) *:text-base">
                <span> {todos.reduce((acc, todo) => acc + (todo.completeState === false ? 1 : 0), 0)} items left</span>

                <div className="flex">
                  <NavLink to="/" className={({ isActive }) => `cursor-pointer px-2 hover:text-(--text-hover) ${isActive && 'text-(--bright-blue) hover:!text-(--bright-blue)'}`}>
                    All
                  </NavLink>
                  <NavLink to="/active" className={({ isActive }) => `cursor-pointer px-2 hover:text-(--text-hover) ${isActive && 'text-(--bright-blue) hover:!text-(--bright-blue)'}`}>
                    Active
                  </NavLink>
                  <NavLink to="/completed" className={({ isActive }) => `cursor-pointer px-2 hover:text-(--text-hover) ${isActive && 'text-(--bright-blue) hover:!text-(--bright-blue)'}`}>
                    Completed
                  </NavLink>
                </div>

                <button type="button" onClick={clearCompleted} className="cursor-pointer hover:text-(--text-hover)">
                  Clear completed
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

function moonSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
    </svg>
  );
}

function sunSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
    </svg>
  );
}
