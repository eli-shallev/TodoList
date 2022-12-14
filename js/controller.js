
function onInit() {
    renderTodos()
}

function renderTodos() {
    var strHTMLs
    const todos = getTodosForDisplay()
    if (!todos.length) {
        if (getFilter() === 'all') strHTMLs = '<span>No Todos left</span>'
        if (getFilter() === 'done') strHTMLs = '<span>No done Todos</span>'
        if (getFilter() === 'active') strHTMLs = '<span>No active Todos</span>'

    } else {
        strHTMLs = todos.map(todo => `
            <li class="${(todo.isDone) ? "done" : ""}"
            onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
            </li>` )
        strHTMLs.join('')
    }

    document.querySelector('.todo-list').innerHTML = strHTMLs

    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    if (txt === '') return

    const elImportance = document.querySelector('input[name="todo-importance"]')
    const importance = elImportance.value
    // console.log('txt', txt)
    addTodo(txt, importance)
    elTxt.value = ''
    renderTodos()

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    // console.log('Removing', todoId)
    if (!confirm('Are you sure?')) return

    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSorter(sorterBy) {
    setSort(sorterBy)
    renderTodos()
}



