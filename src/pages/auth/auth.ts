import Block from '../../utils/block';
import {TStringObject} from '../../types/common';
import {formatFormData} from '../../utils/helpers';
import IProfile from '../../components/profile/interface';
import store from '../../utils/store/store';
import {router} from '../../index';
import {ROUTER_EVENTS, ROUTES, STORE_EVENTS} from '../../constants/constants';

import Image from '../../../assets/images/welcome.png';
import AuthForm from '../../modules/form/auth-form/form';
import Welcome from '../../components/welcome/welcome';

import template from './auth.tpl.hbs';
import AuthService from '../../utils/services/auth';
import {ILogin} from '../../types/auth';

const classes: TStringObject = {
  FORM_CLASS: 'app__sidebar-form'
};

export default class AuthPage extends Block {
  constructor() {
    super();
    
    store.on(STORE_EVENTS.UPDATED, this.checkUserExist);
    router.on(ROUTER_EVENTS.CHANGED, this.checkUserExist);
  }

  protected componentDidMount() {
    this.checkUserExist();
  }
  
  protected initChildren() {

    this.children['auth-form'] = new AuthForm({
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

    AuthService.login(formatFormData(formData) as unknown as ILogin);
  }

  protected checkUserExist(): void {
    const currentUser: IProfile | undefined | null = store.getState().currentUser;
    if (currentUser) {
      router.go(ROUTES.CHATS);
    }
  }

  public render() {
    return this.compile(template, {});
  }
}
