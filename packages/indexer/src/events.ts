import { EventListener } from './events/event-listener';

export class EventListeners {
  static listeners: Array<EventListener> = [];

  static addListener(listener: EventListener) {
    this.listeners.push(listener);
  }

  static addListeners(...listeners: Array<EventListener>) {
    this.listeners.push(...listeners);
  }

  static getListeners() {
    return this.listeners;
  }
}
