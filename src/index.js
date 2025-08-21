import "./style.css";
import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import { createProjectList, createTask } from "./modules/dom";

const dialog = document.querySelector("#taskDialog");

document.querySelector("#addTaskButton").addEventListener("click", (e) => {
    dialog.showModal();
    e.preventDefault();
})

const appControl = new App();
appControl.createProject(new Project("Home"));

createProjectList(appControl.getProjects())