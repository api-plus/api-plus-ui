import { observable, action } from 'mobx';
import SwaggerParser from 'swagger-parser/dist/swagger-parser';

import Ajax from '../components/ajax';

export default class Project {
  id; // 如果是前端新建的对象，设置 id 为时间戳
  isNew; // 是否前端新建的项目对象，尚未提交到后端
  @observable format; // 指定 specification 格式为 'json' 或 'yaml'
  @observable spec;

  constructor(project) {
    const { id, format, spec, schema } = project;

    this.isNew = id ? false : true;
    this.id = id || Date.now();
    this.format = format || 'yaml';
    this.spec = spec;
    this.schema = schema;
  }

  static async factory(project) {
    // 从 spec 字符串解析成 schema 对象
    let specObj = {};
    if (project.format === 'yaml') {
      specObj = SwaggerParser.YAML.parse(project.spec);
    } else {
      specObj = JSON.parse(project.spec);
    }
    project.schema = await Project.validate(specObj);

    // 生成 project 实例
    return new Project(project);
  }

  isYaml() {
    return this.format === 'yaml';
  }

  // 检查 spec 是否符合 json 或 yaml 格式
  checkFormat() {
    try {
      if (this.isYaml()) {
        SwaggerParser.YAML.parse(this.spec);
      } else {
        JSON.parse(this.spec);
      }
    } catch(e) {
      throw e;
    }
  }

  @action
  setSpec(spec) {
    if (!spec) return;
    this.spec = spec;
  }

  @action
  setFormat(format) {
    if (format !== 'json' && format !== 'yaml') return;
    this.format = format;
  }

  // 解析 spec 中的变量依赖关系
  // static parse(spec, format) {
  //   if (format === 'json') {
  //     return SwaggerParser.YAML.stringify(spec);
  //   } else if (format === 'yaml') {
  //     return SwaggerParser.YAML.parse(spec);
  //   } else {
  //     return null;
  //   }
  // }

  static async validate(json) {
    return await SwaggerParser.validate(json);
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

  static defaultSpec = `swagger: '2.0'
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
    properties:
      name:
        type: string
      age:
        type: integer
        format: int32
        minimum: 0
  error:
    properties:
      name:
        type: string
  `
}
