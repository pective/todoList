import { format } from "date-fns";

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
        this.date = this.#formatDate(date);
        this.priority = priority;
        this.isDone = isDone;
        this.project = project;
    }

    markDone() {
        this.isDone ? this.isDone = false : this.isDone = true;
    }
    
    #formatDate(date) {
        if (!date) return 'No due date';
        try {
            const d = date instanceof Date ? date : new Date(date);
            if (isNaN(d.getTime())) return 'No due date';
            return format(d, 'P');
        } catch (e) {
            return 'No due date';
        }
    }
    
}