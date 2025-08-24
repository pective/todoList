import "./style.css";
import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import { DOMController } from "./modules/dom";

const dialog = document.querySelector("#taskDialog");

document.querySelector("#addTaskButton").addEventListener("click", (e) => {
    dialog.showModal();
    e.preventDefault();
})

const taskForm = dialog.querySelector("form");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    DOMController.createTask();
    taskForm.reset();
    dialog.close();
});

let projectList = [];
const homeProject = new Project("Home");

const appControl = new App(projectList, homeProject);
appControl.createProject(homeProject);

homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), 2, false, homeProject));

DOMController.createProjectList(appControl.getProjects());