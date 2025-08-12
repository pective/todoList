export default class App {
    constructor(projectList = []) {
        this.projectList = projectList;
    }

    addProject(project) {
        this.projectList.push(project);
    }

    removeProject(name) {
        let index = this.projectList.findIndex(name);

        this.projectList.splice(index, 1);
    }
}