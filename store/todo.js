import { makeObservable, observable, computed, action } from "mobx"

class Todo {
    id = Math.random()
    @observable title = ""
    @observable finished = false

    constructor() {
        makeObservable(this)
    }

    @action
    toggle() {
        this.finished = !finished
    }
}

class TodoList {
    @observable todos = []

    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }

    constructor() {
        makeObservable(this)
    }
}