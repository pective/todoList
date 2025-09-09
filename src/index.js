import "./style.css";

import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import DOMController from "./modules/dom";
import storageControl from "./modules/storage";

DOMController.addEventListeners();

let projectList = [];
export let selectedProject = null;

export const appControl = new App(projectList, selectedProject);

// Try to restore from storage
const storedProjects = storageControl.getProjectsFromStorage();
if (storedProjects.length > 0) {
    appControl.projectList = storedProjects;
    const savedName = storageControl.getSelectedProjectName();
    selectedProject =
        (savedName && appControl.getProjects().find((p) => p.name === savedName)) ||
        appControl.getProjects()[0];
} else {
    // Seed defaults if no storage present
    const homeProject = new Project("Home");
    const schoolProject = new Project("School");
    selectedProject = homeProject;

    appControl.createProject(homeProject);
    appControl.createProject(schoolProject);

    homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), "Low", false));
    homeProject.addTask(new Task("Code", "Finish that website boy", new Date(), "High", false));

    storageControl.setProjectsToStorage(appControl);
    storageControl.setSelectedProjectName(selectedProject.name);
}

// Initial render
DOMController.createProjectList(appControl.getProjects());
highlightSelectedProject();
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
    storageControl.setSelectedProjectName(proj.name);

    projectContainer.querySelectorAll(".project-element").forEach((el) => {
        el.classList.remove("selected");
        el.style.removeProperty("background");
    });
    item.classList.add("selected");
    item.style.background = "#797d83ff";


    DOMController.createTaskList(selectedProject);
});

function highlightSelectedProject() {
    const container = document.querySelector(".project-list");
    const items = Array.from(container.querySelectorAll(".project-element"));
    items.forEach((el) => {
        el.classList.remove("selected");
        el.style.removeProperty("background");
    });
    const match = items.find((el) => el.textContent.trim() === selectedProject?.name);
    if (match) {
        match.classList.add("selected");
        match.style.background = "#797d83ff";
    }
}