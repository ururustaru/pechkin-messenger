import Block from '../../utils/block/block';
import IButton from "./interface";

import * as template from './button.tpl.hbs';

class Button extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;
