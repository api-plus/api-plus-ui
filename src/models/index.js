import { useStrict } from 'mobx';
useStrict(true);

import App from './App';
import UI from './UI';

export default {
  app: new App(),
  uiStore: new UI(),
}
