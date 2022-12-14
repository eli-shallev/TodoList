const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'txt'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _sortTodos()
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}
function getFilter(){
    return gFilterBy
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML', 2),
            _createTodo('Master JS', 1),
            _createTodo('Study CSS', 3),

        ]
        
    }
    _sortTodos()
    saveToStorage(STORAGE_KEY, gTodos)
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
}

function setSort(sortBy) {
    gSortBy = sortBy
    _sortTodos()
}

function _sortTodos() {
    if (gSortBy === 'txt') {
        gTodos.sort((todo1, todo2) => {
            if (todo1.txt > todo2.txt) return 1
            if (todo1.txt < todo2.txt) return -1
            return 0
        })
    }
    if (gSortBy === 'created') {
        gTodos.sort((todo1, todo2) => {
            if (todo1.createdAt > todo2.createdAt) return 1
            if (todo1.createdAt < todo2.createdAt) return -1
            return 0
        })
    }
    if (gSortBy === 'importance') {
        gTodos.sort((todo1, todo2) => {
            if (todo1.importance > todo2.importance) return 1
            if (todo1.importance < todo2.importance) return -1
            return 0
        })
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
