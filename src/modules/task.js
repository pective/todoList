import { format } from "date-fns";
import { selectedProject } from "..";

export default class Task {
    constructor (
        name,
        description,
        date,
        priority,
        project = selectedProject,
    ) {
        this.name = name;
        this.description = description;
        this.date = this.#formatDate(date);
        this.priority = priority;
        this.project = project;
    }
    
    #formatDate(date) {
        if (!date) return 'No due date';
        return format(date, 'P');
    }
    
}