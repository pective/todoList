import { format } from "date-fns";
import { selectedProject } from "..";

export default class Task {
    constructor (
        name,
        description,
        date,
        priority,
        isDone
    ) {
        this.name = name;
        this.description = description;
        this.date = this.#formatDate(date);
        this.priority = priority;
        this.isDone = isDone;
    }
    
    #formatDate(date) {
        if (!date) return 'No due date';
        return format(date, 'P');
    }

    isDone() {
        return this.isDone;
    }

    edit(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    markDone() {
        this.isDone = !this.isDone;
    }
    
}