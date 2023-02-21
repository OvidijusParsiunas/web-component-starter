import { styles } from './styles';
const template = document.createElement("template");
template.innerHTML = `
  ${styles}
  <div class="text">Web component says: <span id="greeting"></span></div>
`;
export class WebComponentStarter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        this.greeting = "Hi";
    }
    // getter and setter needed for property change monitoring
    get greeting() {
        return this.greeting;
    }
    set greeting(newValue) {
        console.log('greeting has changed!');
        this.shadowRoot.getElementById("greeting").innerText = newValue;
    }
    static get observedAttributes() {
        return ["greeting"];
    }
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        if (property === 'greeting')
            this.greeting = newValue;
    }
}
customElements.define('web-component-starter', WebComponentStarter);
//# sourceMappingURL=web-component-starter.js.map