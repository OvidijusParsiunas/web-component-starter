export declare class WebComponentStarter extends HTMLElement {
    constructor();
    get greeting(): string;
    set greeting(newValue: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'web-component-starter': WebComponentStarter;
    }
}
//# sourceMappingURL=web-component-starter.d.ts.map