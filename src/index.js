import "./style.css";

import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import { DOMController } from "./modules/dom";

DOMController.addEventListeners();

let projectList = [];
const homeProject = new Project("Home");
const schoolProject = new Project("School");
export let selectedProject = homeProject;

export const appControl = new App(projectList, selectedProject);
appControl.createProject(homeProject);
appControl.createProject(schoolProject);

homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), "Low", false));
homeProject.addTask(new Task("Code", "Finish that website boy", new Date(), "High", false));

DOMController.createProjectList(appControl.getProjects());
DOMController.createTaskList(selectedProject);

// Delegate clicks so it still works after list re-renders
const projectContainer = document.querySelector(".project-list");
projectContainer.addEventListener("click", (e) => {
    const item = e.target.closest(".project-element");
    if (!item || !projectContainer.contains(item)) return;

    if (e.target.closest("button")) return;

    const projectName = item.textContent.trim();
    const proj = appControl.getProjects().find(p => p.name === projectName);
    if (!proj) return;

    selectedProject = proj;

    projectContainer.querySelectorAll(".project-element").forEach((el) => {
        el.classList.remove("selected");
        el.style.removeProperty("background");
    });
    item.classList.add("selected");
    item.style.background = "#C8D4E6";

    DOMController.createTaskList(selectedProject);
});