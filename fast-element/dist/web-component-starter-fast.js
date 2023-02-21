var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FASTElement, customElement, attr, html } from '@microsoft/fast-element';
import { styles } from './styles';
const template = html `<div class="text">Web component says: ${(x) => x.greeting}</div>`;
let WebComponentStarterFast = class WebComponentStarterFast extends FASTElement {
    constructor() {
        super(...arguments);
        this.greeting = 'Hi';
    }
    greetingChanged() {
        console.log('greeting has changed!');
    }
};
__decorate([
    attr
], WebComponentStarterFast.prototype, "greeting", void 0);
WebComponentStarterFast = __decorate([
    customElement({
        name: 'web-component-starter-fast',
        template,
        styles
    })
], WebComponentStarterFast);
export { WebComponentStarterFast };
//# sourceMappingURL=web-component-starter-fast.js.map