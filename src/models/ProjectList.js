
import { observable, action } from 'mobx';
import { matchPath } from 'react-router'


import Ajax from '../components/ajax';
import Project from "./Project";


export default class ProjectList {
  @observable projects = [];
  @observable project = null; // 当前选中的 project
  @observable path = null; // 当前选中的 path
  @observable method = null; // 当前选中的 method
  @observable tempProject = null; // 正在编辑或创建的 project

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

  @action
  async loadProjects() {
    const { data } = await Project.loadAll();

    let projects = [];
    for(let i = 0; i < data.length; i++) {
      const project = await Project.factory(data[i]);
      projects.push(project);
    }

    this.projects = projects;

    // 设置当前选中的 project
    // 这里需要优化一下，如何解析 hash 中的 params 和 query
    // 在包含 params 和 query 的情况下，取到的 hashPath 是 /project/1?method=get&path=xxx
    // // 需要解析出 params = { id: 1 } 和 query = { method: 'get', path: 'xxx' }
    // let hashPath = location.hash.substr(1);
    // const match = matchPath(hashPath, {
    //   path: ['/project/:id', '/edit/project/:id'],
    //   exact: true,
    //   strict: false
    // });
    // if (match) {
    //   const projectId = parseInt(match.params.id);
    //   if (projectId) {
    //     this.setProjectById(projectId);
    //   }
    // }
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
  removeApi(id) {
    this.projects.forEach(project => {
      let apiIndex = project.apis.findIndex(api => api.id === parseInt(id));
      if (apiIndex !== -1) {
        project.apis.splice(apiIndex, 1);
      }
    });
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
  setProject(project) {
    if (!project) return;
    this.project = project;
  }

  @action
  setProjectById(id) {
    this.setProject(this.getProject(id));
  }
}
