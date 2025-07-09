function EachList({ todo, func, isThemeDark }) {
  const { id, task, completeState } = todo;
  const { completedFunc, removeTodoFunc } = func;

  return (
    <div className="group flex h-[65px] items-center gap-6 border-b-1 border-(--todo-border-clr) px-6">
      <button onClick={() => completedFunc(id)} className={`relative grid size-[25px] cursor-pointer place-items-center rounded-full bg-(--check-border-clr) from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] group-hover:bg-linear-to-br ${completeState ? 'bg-linear-to-br' : ''}`}>
        <span className={`absolute inset-[1px] z-1 rounded-full bg-(--todo-body-bg) transition-opacity ${completeState && 'opacity-0'}`}></span>
        {checkSvg()}
      </button>
      <span className={`flex-1 ${completeState && 'line-through text-(--line-through) cursor-default'}`}>{task}</span>
      <button onClick={() => removeTodoFunc(id)} data-id={id} className="relative cursor-pointer transition-opacity group-hover:opacity-50 hover:opacity-100 [@media(pointer:fine)]:opacity-0">
        {removeSvg(`${isThemeDark && 'fill-zinc-400'}`)}
        <span className="absolute -inset-2 [@media(pointer:fine)]:hidden"></span>
      </button>
    </div>
  );
}

export default EachList;

function checkSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
    </svg>
  );
}

function removeSvg(styles) {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <path className={`${styles}`} fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>
  );
}
