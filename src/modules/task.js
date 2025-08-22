export default class Task {
    constructor (
        name,
        description,
        date,
        priority,
        isDone = false,
        project,
    ) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isDone = isDone;
        this.project = project;
    }

    markDone() {
        this.isDone ? this.isDone = false : this.isDone = true;
    }
    
}