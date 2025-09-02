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

const appControl = new App(projectList, selectedProject);
appControl.createProject(homeProject);
appControl.createProject(schoolProject);

homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), "Low", false));
homeProject.addTask(new Task("Code", "Finish that website boy", new Date(), "High", false));

DOMController.createProjectList(appControl.getProjects());
DOMController.createTaskList(selectedProject);

function renderProjects() {
    const projectElements = document.querySelectorAll(".project-element");
    projectElements.forEach((e) => {
        e.addEventListener("click", () => {
            const projectName = e.textContent.trim();
            const proj = appControl.getProjects().find(p => p.name == projectName);
            if (!proj) return;

            selectedProject = proj;

            projectElements.forEach((el) => {
                el.classList.remove("selected");
                el.style.removeProperty("background");
            });
            e.classList.add("selected");
            e.style.background = "#C8D4E6";

            DOMController.createTaskList(selectedProject);
        })
    })
}
renderProjects()