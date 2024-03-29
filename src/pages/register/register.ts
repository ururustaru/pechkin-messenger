import Block from '../../utils/block/block';
import {router} from '../../index';
import store from '../../utils/store/store';
import {TStringObject} from '../../types/common';
import {IUser} from '../../types/user';

import AuthService from  '../../utils/services/auth';

import Image from '../../../assets/images/welcome.png';
import RegisterForm from '../../modules/form/register-form/form';
import Welcome from '../../components/welcome/welcome';
import {ROUTES} from '../../constants/constants';

import * as template from './register.hbs';
import {formatFormData} from '../../utils/helpers/format-data';

const classes: TStringObject = {
  FORM_CLASS: 'app__sidebar-form'
};

export default class RegisterPage extends Block {  
  protected componentDidMount() {
    this.checkUserExist();
  }

  protected onStoreUpdate() {
    this.checkUserExist();
  }

  protected initChildren() {
    this.children['auth-form'] = new RegisterForm({
      classes: classes.FORM_CLASS,
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });

    this.children.welcome = new Welcome({
      title: 'Pechkin Messenger',
      desc: 'место, где нет преград общению',
      image: Image
    });
  }

  protected onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    AuthService.register(formatFormData(formData) as unknown as IUser);
  }

  protected checkUserExist(): void {
    const currentUser: IUser | undefined | null = store.getState().currentUser;
    if (currentUser) {
      router.go(ROUTES.CHATS);
    }
  }

  public render() {
    return this.compile(template, {});
  }
}
