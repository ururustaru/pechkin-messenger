import Block from '../../utils/block';
import IModal from "./interface";

import template from './modal.tpl.hbs';

class Modal extends Block {
  constructor(props: IModal) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Modal;