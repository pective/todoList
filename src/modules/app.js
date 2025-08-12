export default class App {
    constructor(projectList = []) {
        this.projectList = projectList;
    }

    createProject(project) {
        this.projectList.push(project);
    }

    removeProject(name) {
        let index = this.projectList.findIndex(name);

        this.projectList.splice(index, 1);
    }

    getProjects() {
        return this.projectList;
    }
}