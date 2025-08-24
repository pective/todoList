import { format } from "date-fns";
import Task from "./task";

const projectContainer = document.querySelector(".project-list")

export class DOMController {
    constructor() {}

    static createProjectList(projects) {
        for (let i = 0; i < projects.length; i++) {
            const projectElement = document.createElement("li");
            projectElement.textContent = projects[i].name;

            const projectRemove = document.createElement("button");
            projectRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;

            projectElement.appendChild(projectRemove);
            projectContainer.appendChild(projectElement);
        }
    }

    static taskFromForm() {
        const taskInfo = {
            title: document.querySelector("#taskDialog input[name='taskTitle']").value,
            description: document.querySelector("#taskDialog input[name='taskDescription']").value,
            dueDate: document.querySelector("#taskDialog input[name='taskDueDate']").value,
            priority: document.querySelector("#taskDialog select[name='taskPriority']").value
        }

        const task = new Task(taskInfo.title, taskInfo.description, taskInfo.dueDate ? format(new Date(taskInfo.dueDate), 'P') : 'No due date', taskInfo.priority, false, "Home");
        return task;
    }

    static createTask() {
        const tasksContainer = document.querySelector(".task-list");
        
        const taskInfo = this.taskFromForm();

        const taskBody = document.createElement("div");
        taskBody.classList.add("task-body")

        const titleElement = document.createElement("h2");
        titleElement.textContent = taskInfo.name;

        const descElement = document.createElement("p");
        descElement.textContent = taskInfo.description;

        const dateElement = document.createElement("h3")
        dateElement.textContent = taskInfo.date;

        const priorityElement = document.createElement("div");
        priorityElement.textContent = taskInfo.priority;

        taskBody.appendChild(titleElement);
        taskBody.appendChild(descElement);
        taskBody.appendChild(dateElement);
        taskBody.appendChild(priorityElement);

        tasksContainer.appendChild(taskBody);
    }
}
