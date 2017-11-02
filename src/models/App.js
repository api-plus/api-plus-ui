import { observable, action } from 'mobx';

import Ajax from '../components/ajax';
import Project from "./Project";

export default class App {
  @observable method = 'asfasdf'; // 当前选中的 method
  @observable projects = [];
  @observable project = null; // 当前选中的 project
  @observable path = null; // 当前选中的 path
  @observable tempProject = null; // 临时的 project，一般是正在编辑或创建的 project

  getProject(projectId) {
    return this.projects.find(project => project.id === projectId);
  }

  isActiveProject(projectId) {
    if (this.project) {
      return this.project.id === projectId;
    } else {
      return false;
    }
  }

  async loadProjects() {
    const { data } = await Project.loadAll();

    let projects = [];
    for (let i = 0; i < data.length; i++) {
      projects.push(await Project.factory(data[i]));
    }
    this.setProjects(projects);
    // this.setProjects(data.map(project => new Project(project)));
  }

  @action
  addProject(project) {
    this.projects.push(project);
  }

  @action
  addApi(api) {
    const project = this.getProject(parseInt(api.project_id));
    project.apis.push(api);
  }

  @action
  removeProject(id) {
    let index = this.projects.findIndex(project => project.id === parseInt(id));
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }
  
  @action
  setPath(path) {
    this.path = path;
  }

  @action
  setMethod(method) {
    this.method = method;
  }
  
  @action
  setProjects(projects) {
    if (!projects) return;
    this.projects = projects;
  }

  @action
  setTempProject(tempProject) {
    this.tempProject = tempProject;
  }

  @action
  setProject(project) {
    if (!project) return;
    this.project = project;
  }

  @action
  setProjectById(id) {
    this.setProject(this.getProject(id));
  }
}
