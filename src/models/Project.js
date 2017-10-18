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
    this.info = info
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

  @action
  toggleFold(fold) {
    this.fold = !fold;
  }

  static sample = `swagger: '2.0'
info:
  version: 1.0.0
  title: Swagger Petstore
  description: >
    A sample API that uses a petstore as an example
    to demonstrate features in the swagger-2.0 specification
consumes:
  - application/json
produces:
  - application/json
paths:
  /pets:
    get:
      description: Returns all pets from the petstore
      responses:
        '200':
          description: pet response
          schema:
            type: array
            items:
              $ref: '#/definitions/pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/errorModel'
    post:
      description: Creates a new pet in the store
      parameters:
        - name: pet
          in: body
          description: Pet to add to the store
          required: true
          schema:
            $ref: '#/definitions/pet'
      responses:
        '200':
          description: pet response
          schema:
            $ref: '#/definitions/pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/errorModel'
  '/pets/{name}':
    get:
      description: Returns a single pet by name
      parameters:
        - name: name
          in: path
          description: Name of the pet to fetch
          required: true
          type: string
      responses:
        '200':
          description: pet response
          schema:
            $ref: '#/definitions/pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/errorModel'
definitions:
  pet:
    $ref: pet.yaml
  pet-owner:
    $ref: pet-owner.yaml
  errorModel:
    $ref: error.json
  
  `
}
