import {customElement, property} from 'lit/decorators.js';
import { html, LitElement, PropertyValues } from 'lit';
import { styles } from './styles';

@customElement('web-component-starter-lit')
export class WebComponentStarterLit extends LitElement {
  static override styles = [styles];
  
  @property({type: String})
  greeting = 'Hi';

  override render() {
    return html`<div class="text">Web component says: ${this.greeting}</div>`;
  }

  override update(changedProperties: PropertyValues) {
    if (changedProperties.has('greeting')) {
      console.log('greeting has changed!')
    }
    super.update(changedProperties);
  }
}

// The following type makes it easier for other projects to use this component with TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'web-component-starter-lit': WebComponentStarterLit;
  }
}