import {FASTElement, customElement, attr, html} from '@microsoft/fast-element';
import { styles } from './styles';

const template = html`<div class="text">Web component says: ${(x) => x.greeting}</div>`;

@customElement({
  name: 'web-component-starter-fast',
  template,
  styles
})
export class WebComponentStarterFast extends FASTElement {
  @attr greeting = 'Hi';

  greetingChanged() {
    console.log('greeting has changed!')
  }
}

// The following type makes it easier for other projects to use this component with TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'web-component-starter-fast': WebComponentStarterFast;
  }
}