import Block from '../../utils/block/block';
import IErrorScreen from './interface';

import * as template from './error-screen.tpl.hbs';

class ErrorScreen extends Block {
  constructor(props: IErrorScreen) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default ErrorScreen;
