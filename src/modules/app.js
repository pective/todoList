export default class App {
    constructor(projectList, selectedProject) {
        this.projectList = projectList;
        this.selectedProject = selectedProject;
    }

    createProject(project) {
        this.projectList.push(project);
    }

    removeProject(name) {
        let index = this.projectList.findIndex(project => project.name === name);

        this.projectList.splice(index, 1);
    }

    getProjects() {
        return this.projectList;
    }
    
    selectProject(project) {
        this.selectedProject = project;
    }
}