export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTask(task) {
        this.taskList.push(task);
    }

    removeTask(task) {
        let index = this.taskList.findIndex(e => e.name === task.name);

        this.taskList.splice(index, 1);
    }

    getTasks() {
        return this.taskList;
    }
}