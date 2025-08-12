export default class Project {
    constructor(name, todoList = []) {
        this.name = name;
        this.todoList = todoList;
    }

    addToDo(todo) {
        this.todoList.push(todo);
    }

    removeToDo(name) {
        let index = this.todoList.findIndex(name);

        this.todoList.splice(index, 1);
    }
}