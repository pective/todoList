const container = document.querySelector(".project-list")

export function createProjectList(projects) {
    for (let i = 0; i < projects.length; i++) {
        const projectElement = document.createElement("li");
        projectElement.textContent = projects[i].name;

        const projectRemove = document.createElement("button");
        projectRemove.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`;

        projectElement.appendChild(projectRemove);
        container.appendChild(projectElement);
    }
}

