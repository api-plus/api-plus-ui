import { observable, action } from 'mobx';
import SwaggerParser from 'swagger-parser/dist/swagger-parser';

import Ajax from '../components/ajax';
import Api from './Api.js';

export default class Project {
  id;
  isNew; // 是否前端新建的项目对象，尚未提交到后端
  @observable yaml;
  @observable schema;

  constructor(project) {
    const { id, yaml, schema } = project;

    this.isNew = id ? false : true;
    this.id = id || Date.now();
    this.yaml = yaml;
    this.schema = schema;
  }

  @action
  update(project) {
    this.yaml = project.yaml;
    this.schema = project.schema;
  }

  static async factory(project) {
    project = project || {
      yaml: Project.defaultYaml
    };

    project.schema = await Project.parse(project.yaml);
    return new Project(project);
  }

  static async parse(yaml) {
    return await SwaggerParser.YAML.parse(yaml);
  }

  static async loadById(id) {
    const { body } = await Ajax.get(`/api/projects/${id}`);
    return body;
  }

  static async loadAll() {
    const { body } = await Ajax.get('/api/projects');
    return body;
  }

  static async post(project) {
    const { body } = await Ajax.post('/api/projects').send(project);
    return body;
  }

  static async del(id) {
    const { body } = await Ajax.del(`/api/projects/${id}`);
    return body;
  }

  static async put(project) {
    const { body } = await Ajax.put(`/api/projects/${project.id}`).send(project);
    return body;
  }

  static defaultYaml = `swagger: '2.0'
info:
  version: 1.0.0
  title: Api Plus Example Schema
  description: >
    Api Plus 接口定义示例文档
paths:
  /api/projects:
    get:
      produces:
      - application/json
      - text/html
      consumes:
      - application/json
      description: 返回所有的项目
      responses:
        '200':
          description: projects response
          schema:
            type: array
            items:
              $ref: '#/definitions/project'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/error'
    post:
      description: 创建一个新项目
      parameters:
        - name: username
          in: formData
          description: '用户名'
          required: true
          type: string
        - name: password
          in: formData
          type: string
          description: '密码'
          required: true
      responses:
        '200':
          description: projects response
          schema:
            $ref: '#/definitions/project'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/error'
  '/api/projects/{id}':
    get:
      description: 返回一个项目
      parameters:
        - name: id
          in: path
          description: 项目 id
          required: true
          type: string
      responses:
        '200':
          description: project response
          schema:
            $ref: '#/definitions/project'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/error'
definitions:
  project:
    $ref: project.yaml
  error:
    $ref: error.yaml
  `
}
