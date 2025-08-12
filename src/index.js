import "./style.css";
import Task from "./modules/task";
import Project from "./modules/projects";
import App from "./modules/app";
import { createProjectList } from "./modules/dom";

const appControl = new App();
appControl.createProject(new Project("Home"));

createProjectList(appControl.getProjects())