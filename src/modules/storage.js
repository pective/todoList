import Project from "./projects";
import Task from "./task";

export default class storageControl {
    constructor() {}

    static setProjectsToStorage(app) {
        const data = app.getProjects().map((p) => ({
            name: p.name,
            tasks: p.getTasks().map((t) => {
                // Treat "No due date" or falsy values as null
                const hasRealDate = t.date && t.date !== "No due date";
                let iso = null;
                if (hasRealDate) {
                    const d = new Date(t.date);
                    if (!isNaN(d)) iso = d.toISOString();
                }
                return {
                    name: t.name,
                    description: t.description,
                    date: iso,
                    priority: t.priority,
                    isDone: !!t.isDone,
                };
            }),
        }));
        localStorage.setItem("projects", JSON.stringify(data));
    }

    static getProjectsFromStorage() {
        const raw = localStorage.getItem("projects");
        if (!raw) return [];

        try {
            const data = JSON.parse(raw);
            return (data || []).map((pd) => {
                const proj = new Project(pd.name);
                (pd.tasks || []).forEach((td) => {
                    const d = td.date ? new Date(td.date) : null;
                    proj.addTask(new Task(td.name, td.description, d, td.priority, td.isDone));
                });
                return proj;
            });
        } catch (err) {
            console.error("Failed to parse projects from storage:", err);
            return [];
        }
    }

    static setSelectedProjectName(name) {
        localStorage.setItem("selectedProject", name || "");
    }

    static getSelectedProjectName() {
        const n = localStorage.getItem("selectedProject");
        return n && n.length ? n : null;
    }
}