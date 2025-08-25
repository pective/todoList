import { DOMController } from "./dom";

export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTask(task) {
        this.taskList.push(task);

        DOMController.createTask();
    }

    removeTask(name) {
        let index = this.taskList.findIndex(e => e.name === name);

        this.taskList.splice(index, 1);
    }

    getTasks() {
        return this.taskList;
    }
}