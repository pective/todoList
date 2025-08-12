const container = document.querySelector(".project-list")

export function createProjectList(projects) {
    for (let i = 0; i < projects.length; i++) {
        const projectElement = document.createElement("div");

        const projectTitle = document.createElement("div");
        projectTitle.textContent = projects[i].name;

        projectElement.appendChild(projectTitle);
        container.appendChild(projectElement);
    }
}

