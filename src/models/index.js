import Project from './Project';
import ProjectList from './ProjectList';
import Api from './Api';
import UI from './UI';

export default {
  projectListStore: new ProjectList(),
  // projectStore: new Project(),
  // apiStore: new Api(),
  uiStore: new UI(),
}

// export default {
//   init: function async() {
//     const projectList = await (new ProjectList).init();
//     return {
//       projectListStore: projectList
//     }
//   }
// }