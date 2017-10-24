import { observable, action } from 'mobx';
import SwaggerParser from 'swagger-parser/dist/swagger-parser';

import Ajax from '../components/ajax';
import Api from './Api.js';

export default class Project {
  id;
  @observable paths;

  constructor(project) {
    const { id, paths, info } = project;
    this.id = id || Date.now();
    this.paths = paths;
    this.info = info;
  }

  static async parse(project) {
    const json = await SwaggerParser.YAML.parse(project.spec);
    json.id = project.id;
    return new Project(json);
  }

  static async loadById(id) {
    const { body } = await Ajax.get(`/api/projects/${id}`);
    return body;
  }

  static async loadAll() {
    const { body } = await Ajax.get('/api/projects');
    return body;
  }

  static async create(project) {
    const { body } = await Ajax.post('/api/projects').send(project);
    return body;
  }

  static async remove(id) {
    const { body } = await Ajax.del(`/api/projects/${id}`);
    return body;
  }

  static async update(project) {
    const { body } = await Ajax.put(`/api/projects/${project.id}`).send(project);
    return body;
  }

  static sample = `swagger: '2.0'
info:
  version: 1.0.0
  title: Api Plus Example Spec
  description: >
    Api Plus 接口定义示例文档
consumes:
  - application/json
produces:
  - application/json
paths:
  /api/projects:
    get:
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
        - name: project
          in: body
          description: 新建的项目的数据
          required: true
          schema:
            $ref: '#/definitions/project'
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
