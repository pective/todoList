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

taskDialog.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    DOMController.createTask();
    taskForm.reset();
    taskDialog.close();
});

document.querySelector("#addProjectButton").addEventListener("click", (e) => {
    projectDialog.showModal();
})

projectDialog.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    DOMController.createProject()
    projectDialog.close();
})

let projectList = [];
const homeProject = new Project("Home");
const schoolProject = new Project("School");
export let selectedProject = homeProject;

const appControl = new App(projectList, selectedProject);
appControl.createProject(homeProject);
appControl.createProject(schoolProject);

homeProject.addTask(new Task("Dishes", "Put them in the dishwaszer", new Date(), 2, selectedProject));
homeProject.addTask(new Task("Code", "Finish that website boy", new Date(), 3, selectedProject));


DOMController.createProjectList(appControl.getProjects());
DOMController.createTaskList(selectedProject.getTasks());