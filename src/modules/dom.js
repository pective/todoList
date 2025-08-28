import Task from "./task";
import Project from "./projects";

const projectContainer = document.querySelector(".project-list")

export class DOMController {
    constructor() {}

    static #buildTaskElement(task) {
        const taskBody = document.createElement("div");
        taskBody.classList.add("task-body");
        if (task.isDone) taskBody.classList.add("checked");

        const checkBtn = document.createElement("button");
        checkBtn.type = "button";
        checkBtn.className = "task-check";

        const titleElement = document.createElement("h2");
        titleElement.textContent = task.name;

        const descElement = document.createElement("p");
        descElement.textContent = task.description;

        const dateElement = document.createElement("h3");
        dateElement.textContent = task.date;

        const priorityElement = document.createElement("div");
        priorityElement.textContent = task.priority;

        taskBody.appendChild(checkBtn);
        taskBody.appendChild(titleElement);
        taskBody.appendChild(descElement);
        taskBody.appendChild(dateElement);
        taskBody.appendChild(priorityElement);

        taskBody.addEventListener("click", (e) => {
            const toggle = e.target.closest(".task-check");
            if (!toggle) return;
            taskBody.classList.toggle("checked");
        });

        return taskBody;
    }

    static #buildProjectElement(project) {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.name;

        const projectRemove = document.createElement("button");
        projectRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;

        projectElement.appendChild(projectRemove);
        return projectElement;
    }

    static taskFromForm() {
        const title = document.querySelector("#taskDialog input[name='taskTitle']").value;
        const description = document.querySelector("#taskDialog input[name='taskDescription']").value;
        const dueDateRaw = document.querySelector("#taskDialog input[name='taskDueDate']").value;
        const priority = document.querySelector("#taskDialog select[name='taskPriority']").value;

        const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

        return new Task(title, description, dueDate, priority, false);
    }

    static createTask() {
        const tasksContainer = document.querySelector(".task-list");
        const task = this.taskFromForm();
        const taskElement = this.#buildTaskElement(task);
        tasksContainer.appendChild(taskElement);
    }

    static createTaskList(taskList) {
        const tasksContainer = document.querySelector(".task-list");
        const fragment = document.createDocumentFragment();
        for (let task of taskList) {
            fragment.appendChild(this.#buildTaskElement(task));
        }
        tasksContainer.appendChild(fragment);
    }

    static projectFromForm() {
        const name = document.querySelector("#projectDialog input[name='projectName']").value;

        return new Project(name);
    }

    static createProject() {
        const project = this.projectFromForm();
        const projectElement = this.#buildProjectElement(project);

        projectContainer.appendChild(projectElement);
    }

    static createProjectList(projects) {
        const fragment = document.createDocumentFragment();
        for (let project of projects) {
            fragment.appendChild(this.#buildProjectElement(project));
        }
        projectContainer.appendChild(fragment);
    }
}
