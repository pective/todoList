import "./style.css";
import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import { DOMController } from "./modules/dom";

const taskDialog = document.querySelector("#taskDialog");
const projectDialog = document.querySelector("#projectDialog")

document.querySelector("#addTaskButton").addEventListener("click", (e) => {
    taskDialog.showModal();
})

const taskForm = taskDialog.querySelector("form")
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    selectedProject.addTask(DOMController.taskFromForm());
    taskForm.reset();
    taskDialog.close();

    DOMController.createTaskList(selectedProject);
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

let projectList = [];
const homeProject = new Project("Home");
const schoolProject = new Project("School");
export let selectedProject = homeProject;

const appControl = new App(projectList, selectedProject);
appControl.createProject(homeProject);
appControl.createProject(schoolProject);

homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), 2, false));
homeProject.addTask(new Task("Code", "Finish that website boy", new Date(), 3, false));


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