import Block from '../../../utils/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class DeleteUserForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['delete-user-field'] = new FormField({
      name: 'login',
      label: 'Логин пользователя',
      errorText: VALIDATION_RULES.LOGIN.errorText,
      field: {
        type: 'text',
        name: 'login',
        placeholder: 'Например, ivanov123',
        minlength: 3,
        maxlength: 20,
        required: true,
        rule: VALIDATION_RULES.LOGIN.rule
      }
    });

    this.children['button-save'] = new Button({
      text: 'Удалить',
      type: 'submit',
      classes: 'button--alert'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default DeleteUserForm;
