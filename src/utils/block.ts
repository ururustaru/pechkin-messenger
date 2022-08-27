import EventBus from './event-bus';
import {nanoid} from 'nanoid';
import {isEqual} from './helpers';
import store from './store/store';
import {router} from '../index';
import {ROUTER_EVENTS, STORE_EVENTS} from '../constants/constants';

class Block {
  /** JSDoc
   * @param {Object} args
   *
   * @returns {void}
   */
  constructor(args: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(args);

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.initChildren();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);

    router.on(ROUTER_EVENTS.CHANGED, () => {return});
    store.on(STORE_EVENTS.UPDATED, () => {return});
  }
  
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  
  private eventBus: () => EventBus;

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  private _makePropsProxy(props: any) {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = { ...target };
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }
  
  protected props: any;
  
  protected children: Record<string, Block>;

  protected componentDidMount() {
    return;
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    if (!isEqual(oldProps, newProps)) return true;

    return;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected getChildren(args: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(args).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {
    return;
  }

  protected compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(context);
    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent() as HTMLElement);
    });

    return fragment.content;
  }
  
  public id = nanoid(10);

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  public init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  public show() {
    const el = this.getContent();

    if (el) {
      el.style.display = 'block';
    }
  }

  public hide() {
    const el = this.getContent();

    if (el) {
      el.style.display = 'none';
    }
  }
}

export default Block;
