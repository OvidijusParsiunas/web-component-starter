var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import { styles } from './styles';
let WebComponentStarterLit = class WebComponentStarterLit extends LitElement {
    constructor() {
        super(...arguments);
        this.greeting = 'Hi';
    }
    render() {
        return html `<div class="text">Web component says: ${this.greeting}</div>`;
    }
    update(changedProperties) {
        if (changedProperties.has('greeting')) {
            console.log('greeting has changed!');
        }
        super.update(changedProperties);
    }
};
WebComponentStarterLit.styles = [styles];
__decorate([
    property({ type: String })
], WebComponentStarterLit.prototype, "greeting", void 0);
WebComponentStarterLit = __decorate([
    customElement('web-component-starter-lit')
], WebComponentStarterLit);
export { WebComponentStarterLit };
//# sourceMappingURL=web-component-starter-lit.js.map