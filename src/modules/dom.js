import Task from "./task";
import Project from "./projects";
import { selectedProject } from "..";
import { formatISO } from "date-fns";

const projectContainer = document.querySelector(".project-list")
let editingTask;

export class DOMController {
    constructor() {}

    static #buildTaskElement(task) {
        const taskBody = document.createElement("div");
        taskBody.classList.add("task-body");

        const checkBtn = document.createElement("button");
        checkBtn.type = "button";
        checkBtn.classList.add("task-check");

        const titleElement = document.createElement("h2");
        titleElement.textContent = task.name;

        const descElement = document.createElement("p");
        descElement.textContent = task.description;

        const dateElement = document.createElement("h3");
        dateElement.textContent = task.date;

        const priorityElement = document.createElement("div");
        priorityElement.textContent = task.priority;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("task-edit");

        editButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const taskEditDialog = document.querySelector("#taskEditDialog");
            const editForm = taskEditDialog.querySelector("form");

            editingTask = task;

            editForm.querySelector("input[name='taskTitle']").value = task.name || "";
            editForm.querySelector("input[name='taskDescription']").value = task.description || "";
            editForm.querySelector("input[name='taskDueDate']").value = formatISO(new Date(task.date), { representation: 'date' }) || "";
            editForm.querySelector("select[name='taskPriority']").value = String(task.priority ?? "");

            taskEditDialog.showModal();
        })

        taskBody.appendChild(checkBtn);
        taskBody.appendChild(titleElement);
        taskBody.appendChild(descElement);
        taskBody.appendChild(dateElement);
        taskBody.appendChild(priorityElement);
        taskBody.appendChild(editButton);

        if(task.isDone) {
            taskBody.classList.toggle("checked");
        }

        checkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            task.markDone();
            console.log("check clicked:", task.name);
            taskBody.classList.toggle("checked");
        });

        return taskBody;
    }

    static #buildProjectElement(project) {
        const projectElement = document.createElement("li");
        projectElement.textContent = project.name;
        projectElement.classList.add("project-element");

        const projectRemove = document.createElement("button");
        projectRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;

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

        return task;
    }

    static createTaskList(project) {
        const tasksContainer = document.querySelector(".task-list");
        tasksContainer.innerHTML = "";

        const taskList = project.getTasks();

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
        return project;
    }

    static createProjectList(projects) {
        projectContainer.innerHTML = "";
        const fragment = document.createDocumentFragment();
        for (let project of projects) {
            fragment.appendChild(this.#buildProjectElement(project));
        }
        projectContainer.appendChild(fragment);
    }

    static addEventListeners() {
        const taskDialog = document.querySelector("#taskDialog");
        const projectDialog = document.querySelector("#projectDialog")
        
        document.querySelector("#addTaskButton").addEventListener("click", (e) => {
            taskDialog.showModal();
        })
        
        const taskForm = taskDialog.querySelector("form")
        taskForm.addEventListener("submit", (e) => {
            selectedProject.addTask(DOMController.taskFromForm());
            taskForm.reset();
            taskDialog.close();
        
            DOMController.createTaskList(selectedProject);
            e.preventDefault();
        });
        taskForm.addEventListener("reset", () => {
            setTimeout(() => taskDialog.close(), 0);
        });
        
        
        document.querySelector("#addProjectButton").addEventListener("click", (e) => {
            projectDialog.showModal();
        })
        
        const projectForm = projectDialog.querySelector("form")
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            appControl.createProject(DOMController.createProject());
            projectForm.reset();
            projectDialog.close();
        
            DOMController.createProjectList(appControl.getProjects());
            renderProjects();
        })
        projectForm.addEventListener("reset", () => {
            setTimeout(() => projectDialog.close(), 0);
        })

        const editDialog = document.querySelector("#taskEditDialog");
        const editForm = editDialog.querySelector("form");
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = editForm.querySelector("input[name='taskTitle']").value;
            const description = editForm.querySelector("input[name='taskDescription']").value;
            const dueDateRaw = editForm.querySelector("input[name='taskDueDate']").value;
            const priority = editForm.querySelector("select[name='taskPriority']").value;

            editingTask.edit(name, description, dueDateRaw, priority);
            editingTask = null;
            editDialog.close();

            DOMController.createTaskList(selectedProject);
        })

        editForm.addEventListener("reset", () => {
            setTimeout(() => editDialog.close(), 0);
        })
    }
}
