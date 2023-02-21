const t=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(t){return{}}}();void 0===t.trustedTypes&&(t.trustedTypes={createPolicy:(t,e)=>e});const e={configurable:!1,enumerable:!1,writable:!1};void 0===t.FAST&&Reflect.defineProperty(t,"FAST",Object.assign({value:Object.create(null)},e));const s=t.FAST;if(void 0===s.getById){const t=Object.create(null);Reflect.defineProperty(s,"getById",Object.assign({value(e,s){let i=t[e];return void 0===i&&(i=s?t[e]=s():null),i}},e))}function i(){const t=new WeakMap;return function(e){let s=t.get(e);if(void 0===s){let i=Reflect.getPrototypeOf(e);for(;void 0===s&&null!==i;)s=t.get(i),i=Reflect.getPrototypeOf(i);s=void 0===s?[]:s.slice(0),t.set(e,s)}return s}}Object.freeze([]);const n=t.FAST.getById(1,(()=>{const e=[],s=[];function i(){if(s.length)throw s.shift()}function n(t){try{t.call()}catch(t){s.push(t),setTimeout(i,0)}}function r(){let t=0;for(;t<e.length;)if(n(e[t]),t++,t>1024){for(let s=0,i=e.length-t;s<i;s++)e[s]=e[s+t];e.length-=t,t=0}e.length=0}return Object.freeze({enqueue:function(s){e.length<1&&t.requestAnimationFrame(r),e.push(s)},process:r})})),r=t.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let o=r;const l=`fast-${Math.random().toString(36).substring(2,8)}`,a=`${l}{`,h=`}${l}`,c=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(o!==r)throw new Error("The HTML policy can only be set once.");o=t},createHTML:t=>o.createHTML(t),isMarker:t=>t&&8===t.nodeType&&t.data.startsWith(l),extractDirectiveIndexFromMarker:t=>parseInt(t.data.replace(`${l}:`,"")),createInterpolationPlaceholder:t=>`${a}${t}${h}`,createCustomAttributePlaceholder(t,e){return`${t}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder:t=>`\x3c!--${l}:${t}--\x3e`,queueUpdate:n.enqueue,processUpdates:n.process,nextUpdate:()=>new Promise(n.enqueue),setAttribute(t,e,s){null==s?t.removeAttribute(e):t.setAttribute(e,s)},setBooleanAttribute(t,e,s){s?t.setAttribute(e,""):t.removeAttribute(e)},removeChildNodes(t){for(let e=t.firstChild;null!==e;e=t.firstChild)t.removeChild(e)},createTemplateWalker:t=>document.createTreeWalker(t,133,null,!1)});class d{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return void 0===this.spillover?this.sub1===t||this.sub2===t:-1!==this.spillover.indexOf(t)}subscribe(t){const e=this.spillover;if(void 0===e){if(this.has(t))return;if(void 0===this.sub1)return void(this.sub1=t);if(void 0===this.sub2)return void(this.sub2=t);this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else{-1===e.indexOf(t)&&e.push(t)}}unsubscribe(t){const e=this.spillover;if(void 0===e)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=e.indexOf(t);-1!==s&&e.splice(s,1)}}notify(t){const e=this.spillover,s=this.source;if(void 0===e){const e=this.sub1,i=this.sub2;void 0!==e&&e.handleChange(s,t),void 0!==i&&i.handleChange(s,t)}else for(let i=0,n=e.length;i<n;++i)e[i].handleChange(s,t)}}class u{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const s=this.subscribers[t];void 0!==s&&s.notify(t),null===(e=this.sourceSubscribers)||void 0===e||e.notify(t)}subscribe(t,e){var s;if(e){let s=this.subscribers[e];void 0===s&&(this.subscribers[e]=s=new d(this.source)),s.subscribe(t)}else this.sourceSubscribers=null!==(s=this.sourceSubscribers)&&void 0!==s?s:new d(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var s;if(e){const s=this.subscribers[e];void 0!==s&&s.unsubscribe(t)}else null===(s=this.sourceSubscribers)||void 0===s||s.unsubscribe(t)}}const f=s.getById(2,(()=>{const t=/(:|&&|\|\||if)/,e=new WeakMap,s=c.queueUpdate;let n,r=t=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function o(t){let s=t.$fastController||e.get(t);return void 0===s&&(Array.isArray(t)?s=r(t):e.set(t,s=new u(t))),s}const l=i();class a{constructor(t){this.name=t,this.field=`_${t}`,this.callback=`${t}Changed`}getValue(t){return void 0!==n&&n.watch(t,this.name),t[this.field]}setValue(t,e){const s=this.field,i=t[s];if(i!==e){t[s]=e;const n=t[this.callback];"function"==typeof n&&n.call(t,i,e),o(t).notify(this.name)}}}class h extends d{constructor(t,e,s=!1){super(t,e),this.binding=t,this.isVolatileBinding=s,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(t,e){this.needsRefresh&&null!==this.last&&this.disconnect();const s=n;n=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const i=this.binding(t,e);return n=s,i}disconnect(){if(null!==this.last){let t=this.first;for(;void 0!==t;)t.notifier.unsubscribe(this,t.propertyName),t=t.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(t,e){const s=this.last,i=o(t),r=null===s?this.first:{};if(r.propertySource=t,r.propertyName=e,r.notifier=i,i.subscribe(this,e),null!==s){if(!this.needsRefresh){let e;n=void 0,e=s.propertySource[s.propertyName],n=this,t===e&&(this.needsRefresh=!0)}s.next=r}this.last=r}handleChange(){this.needsQueue&&(this.needsQueue=!1,s(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let t=this.first;return{next:()=>{const e=t;return void 0===e?{value:void 0,done:!0}:(t=t.next,{value:e,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(t){r=t},getNotifier:o,track(t,e){void 0!==n&&n.watch(t,e)},trackVolatile(){void 0!==n&&(n.needsRefresh=!0)},notify(t,e){o(t).notify(e)},defineProperty(t,e){"string"==typeof e&&(e=new a(e)),l(t).push(e),Reflect.defineProperty(t,e.name,{enumerable:!0,get:function(){return e.getValue(this)},set:function(t){e.setValue(this,t)}})},getAccessors:l,binding(t,e,s=this.isVolatileBinding(t)){return new h(t,e,s)},isVolatileBinding:e=>t.test(e.toString())})})),b=s.getById(3,(()=>{let t=null;return{get:()=>t,set(e){t=e}}}));class g{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return b.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){b.set(t)}}f.defineProperty(g.prototype,"index"),f.defineProperty(g.prototype,"length");const p=Object.seal(new g);class v{constructor(){this.targetIndex=0}}class m extends v{constructor(){super(...arguments),this.createPlaceholder=c.createInterpolationPlaceholder}}function y(t,e){this.source=t,this.context=e,null===this.bindingObserver&&(this.bindingObserver=f.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,e))}function C(t,e){this.source=t,this.context=e,this.target.addEventListener(this.targetName,this)}function S(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function x(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function w(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function T(t){c.setAttribute(this.target,this.targetName,t)}function B(t){c.setBooleanAttribute(this.target,this.targetName,t)}function O(t){if(null==t&&(t=""),t.create){this.target.textContent="";let e=this.target.$fastView;void 0===e?e=t.create():this.target.$fastTemplate!==t&&(e.isComposed&&(e.remove(),e.unbind()),e=t.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=t)}else{const e=this.target.$fastView;void 0!==e&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=t}}function N(t){this.target[this.targetName]=t}function A(t){const e=this.classVersions||Object.create(null),s=this.target;let i=this.version||0;if(null!=t&&t.length){const n=t.split(/\s+/);for(let t=0,r=n.length;t<r;++t){const r=n[t];""!==r&&(e[r]=i,s.classList.add(r))}}if(this.classVersions=e,this.version=i+1,0!==i){i-=1;for(const t in e)e[t]===i&&s.classList.remove(t)}}class k extends m{constructor(t){super(),this.binding=t,this.bind=y,this.unbind=S,this.updateTarget=T,this.isBindingVolatile=f.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,void 0!==t)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=N,"innerHTML"===this.cleanedTargetName){const t=this.binding;this.binding=(e,s)=>c.createHTML(t(e,s))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=B;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=C,this.unbind=w;break;default:this.cleanedTargetName=t,"class"===t&&(this.updateTarget=A)}}targetAtContent(){this.updateTarget=O,this.unbind=x}createBehavior(t){return new F(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class F{constructor(t,e,s,i,n,r,o){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=s,this.bind=i,this.unbind=n,this.updateTarget=r,this.targetName=o}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){g.setEvent(t);const e=this.binding(this.source,this.context);g.setEvent(null),!0!==e&&t.preventDefault()}}let I=null;class ${addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){I=this}static borrow(t){const e=I||new $;return e.directives=t,e.reset(),I=null,e}}function _(t){if(1===t.length)return t[0];let e;const s=t.length,i=t.map((t=>"string"==typeof t?()=>t:(e=t.targetName||e,t.binding))),n=new k(((t,e)=>{let n="";for(let r=0;r<s;++r)n+=i[r](t,e);return n}));return n.targetName=e,n}const M=h.length;function V(t,e){const s=e.split(a);if(1===s.length)return null;const i=[];for(let e=0,n=s.length;e<n;++e){const n=s[e],r=n.indexOf(h);let o;if(-1===r)o=n;else{const e=parseInt(n.substring(0,r));i.push(t.directives[e]),o=n.substring(r+M)}""!==o&&i.push(o)}return i}function E(t,e,s=!1){const i=e.attributes;for(let n=0,r=i.length;n<r;++n){const o=i[n],l=o.value,a=V(t,l);let h=null;null===a?s&&(h=new k((()=>l)),h.targetName=o.name):h=_(a),null!==h&&(e.removeAttributeNode(o),n--,r--,t.addFactory(h))}}function j(t,e,s){const i=V(t,e.textContent);if(null!==i){let n=e;for(let r=0,o=i.length;r<o;++r){const o=i[r],l=0===r?e:n.parentNode.insertBefore(document.createTextNode(""),n.nextSibling);"string"==typeof o?l.textContent=o:(l.textContent=" ",t.captureContentBinding(o)),n=l,t.targetIndex++,l!==e&&s.nextNode()}t.targetIndex--}}const L=document.createRange();class P{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const s=t.parentNode;let i,n=this.firstChild;for(;n!==e;)i=n.nextSibling,s.insertBefore(n,t),n=i;s.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let s,i=this.firstChild;for(;i!==e;)s=i.nextSibling,t.appendChild(i),i=s;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let s,i=this.firstChild;for(;i!==e;)s=i.nextSibling,t.removeChild(i),i=s;t.removeChild(e);const n=this.behaviors,r=this.source;for(let t=0,e=n.length;t<e;++t)n[t].unbind(r)}bind(t,e){const s=this.behaviors;if(this.source!==t)if(null!==this.source){const i=this.source;this.source=t,this.context=e;for(let n=0,r=s.length;n<r;++n){const r=s[n];r.unbind(i),r.bind(t,e)}}else{this.source=t,this.context=e;for(let i=0,n=s.length;i<n;++i)s[i].bind(t,e)}}unbind(){if(null===this.source)return;const t=this.behaviors,e=this.source;for(let s=0,i=t.length;s<i;++s)t[s].unbind(e);this.source=null}static disposeContiguousBatch(t){if(0!==t.length){L.setStartBefore(t[0].firstChild),L.setEndAfter(t[t.length-1].lastChild),L.deleteContents();for(let e=0,s=t.length;e<s;++e){const s=t[e],i=s.behaviors,n=s.source;for(let t=0,e=i.length;t<e;++t)i[t].unbind(n)}}}}class R{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(null===this.fragment){let t;const e=this.html;if("string"==typeof e){t=document.createElement("template"),t.innerHTML=c.createHTML(e);const s=t.content.firstElementChild;null!==s&&"TEMPLATE"===s.tagName&&(t=s)}else t=e;const s=function(t,e){const s=t.content;document.adoptNode(s);const i=$.borrow(e);E(i,t,!0);const n=i.behaviorFactories;i.reset();const r=c.createTemplateWalker(s);let o;for(;o=r.nextNode();)switch(i.targetIndex++,o.nodeType){case 1:E(i,o);break;case 3:j(i,o,r);break;case 8:c.isMarker(o)&&i.addFactory(e[c.extractDirectiveIndexFromMarker(o)])}let l=0;(c.isMarker(s.firstChild)||1===s.childNodes.length&&e.length)&&(s.insertBefore(document.createComment(""),s.firstChild),l=-1);const a=i.behaviorFactories;return i.release(),{fragment:s,viewBehaviorFactories:a,hostBehaviorFactories:n,targetOffset:l}}(t,this.directives);this.fragment=s.fragment,this.viewBehaviorFactories=s.viewBehaviorFactories,this.hostBehaviorFactories=s.hostBehaviorFactories,this.targetOffset=s.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,i=new Array(this.behaviorCount),n=c.createTemplateWalker(e);let r=0,o=this.targetOffset,l=n.nextNode();for(let t=s.length;r<t;++r){const t=s[r],e=t.targetIndex;for(;null!==l;){if(o===e){i[r]=t.createBehavior(l);break}l=n.nextNode(),o++}}if(this.hasHostBehaviors){const e=this.hostBehaviorFactories;for(let s=0,n=e.length;s<n;++s,++r)i[r]=e[s].createBehavior(t)}return new P(e,i)}render(t,e,s){"string"==typeof e&&(e=document.getElementById(e)),void 0===s&&(s=e);const i=this.create(s);return i.bind(t,p),i.appendTo(e),i}}const z=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class H{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=null===this.behaviors?t:this.behaviors.concat(t),this}}function W(t){return t.map((t=>t instanceof H?W(t.styles):[t])).reduce(((t,e)=>t.concat(e)),[])}function q(t){return t.map((t=>t instanceof H?t.behaviors:null)).reduce(((t,e)=>null===e?t:(null===t&&(t=[]),t.concat(e))),null)}H.create=(()=>{if(c.supportsAdoptedStyleSheets){const t=new Map;return e=>new D(e,t)}return t=>new U(t)})();class D extends H{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=q(t)}get styleSheets(){if(void 0===this._styleSheets){const t=this.styles,e=this.styleSheetCache;this._styleSheets=W(t).map((t=>{if(t instanceof CSSStyleSheet)return t;let s=e.get(t);return void 0===s&&(s=new CSSStyleSheet,s.replaceSync(t),e.set(t,s)),s}))}return this._styleSheets}addStylesTo(t){t.adoptedStyleSheets=[...t.adoptedStyleSheets,...this.styleSheets],super.addStylesTo(t)}removeStylesFrom(t){const e=this.styleSheets;t.adoptedStyleSheets=t.adoptedStyleSheets.filter((t=>-1===e.indexOf(t))),super.removeStylesFrom(t)}}let Q=0;class U extends H{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=q(t),this.styleSheets=W(t),this.styleClass="fast-style-class-"+ ++Q}addStylesTo(t){const e=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let i=0;i<e.length;i++){const n=document.createElement("style");n.innerHTML=e[i],n.className=s,t.append(n)}super.addStylesTo(t)}removeStylesFrom(t){const e=(t=this.normalizeTarget(t)).querySelectorAll(`.${this.styleClass}`);for(let s=0,i=e.length;s<i;++s)t.removeChild(e[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const G=Object.freeze({locate:i()}),J={toView:t=>t?"true":"false",fromView:t=>null!=t&&"false"!==t&&!1!==t&&0!==t};class K{constructor(t,e,s=e.toLowerCase(),i="reflect",n){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=s,this.mode=i,this.converter=n,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,"boolean"===i&&void 0===n&&(this.converter=J)}setValue(t,e){const s=t[this.fieldName],i=this.converter;void 0!==i&&(e=i.fromView(e)),s!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,e),t.$fastController.notify(this.name))}getValue(t){return f.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,s=this.guards;s.has(t)||"fromView"===e||c.queueUpdate((()=>{s.add(t);const i=t[this.fieldName];switch(e){case"reflect":const e=this.converter;c.setAttribute(t,this.attribute,void 0!==e?e.toView(i):i);break;case"boolean":c.setBooleanAttribute(t,this.attribute,i)}s.delete(t)}))}static collect(t,...e){const s=[];e.push(G.locate(t));for(let i=0,n=e.length;i<n;++i){const n=e[i];if(void 0!==n)for(let e=0,i=n.length;e<i;++e){const i=n[e];"string"==typeof i?s.push(new K(t,i)):s.push(new K(t,i.property,i.attribute,i.mode,i.converter))}}return s}}const X={mode:"open"},Y={},Z=s.getById(4,(()=>{const t=new Map;return Object.freeze({register:e=>!t.has(e.type)&&(t.set(e.type,e),!0),getByType:e=>t.get(e)})}));class tt{constructor(t,e=t.definition){"string"==typeof e&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const s=K.collect(t,e.attributes),i=new Array(s.length),n={},r={};for(let t=0,e=s.length;t<e;++t){const e=s[t];i[t]=e.attribute,n[e.name]=e,r[e.attribute]=e}this.attributes=s,this.observedAttributes=i,this.propertyLookup=n,this.attributeLookup=r,this.shadowOptions=void 0===e.shadowOptions?X:null===e.shadowOptions?void 0:Object.assign(Object.assign({},X),e.shadowOptions),this.elementOptions=void 0===e.elementOptions?Y:Object.assign(Object.assign({},Y),e.elementOptions),this.styles=void 0===e.styles?void 0:Array.isArray(e.styles)?H.create(e.styles):e.styles instanceof H?e.styles:H.create([e.styles])}get isDefined(){return!!Z.getByType(this.type)}define(t=customElements){const e=this.type;if(Z.register(this)){const t=this.attributes,s=e.prototype;for(let e=0,i=t.length;e<i;++e)f.defineProperty(s,t[e]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}tt.forType=Z.getByType;const et=new WeakMap,st={bubbles:!0,composed:!0,cancelable:!0};function it(t){return t.shadowRoot||et.get(t)||null}class nt extends u{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const s=e.shadowOptions;if(void 0!==s){const e=t.attachShadow(s);"closed"===s.mode&&et.set(t,e)}const i=f.getAccessors(t);if(i.length>0){const e=this.boundObservables=Object.create(null);for(let s=0,n=i.length;s<n;++s){const n=i[s].name,r=t[n];void 0!==r&&(delete t[n],e[n]=r)}}}get isConnected(){return f.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,f.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=t,this.needsInitialization||null===t||this.addStyles(t))}addStyles(t){const e=it(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const s=t.behaviors;t.addStylesTo(e),null!==s&&this.addBehaviors(s)}}removeStyles(t){const e=it(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const s=t.behaviors;t.removeStylesFrom(e),null!==s&&this.removeBehaviors(s)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),s=t.length,i=[];for(let n=0;n<s;++n){const s=t[n];e.has(s)?e.set(s,e.get(s)+1):(e.set(s,1),i.push(s))}if(this._isConnected){const t=this.element;for(let e=0;e<i.length;++e)i[e].bind(t,p)}}removeBehaviors(t,e=!1){const s=this.behaviors;if(null===s)return;const i=t.length,n=[];for(let r=0;r<i;++r){const i=t[r];if(s.has(i)){const t=s.get(i)-1;0===t||e?s.delete(i)&&n.push(i):s.set(i,t)}}if(this._isConnected){const t=this.element;for(let e=0;e<n.length;++e)n[e].unbind(t)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(t,p);const e=this.behaviors;if(null!==e)for(const[s]of e)s.bind(t,p);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;null!==t&&t.unbind();const e=this.behaviors;if(null!==e){const t=this.element;for(const[s]of e)s.unbind(t)}}onAttributeChangedCallback(t,e,s){const i=this.definition.attributeLookup[t];void 0!==i&&i.onAttributeChangedCallback(this.element,s)}emit(t,e,s){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},st),s)))}finishInitialization(){const t=this.element,e=this.boundObservables;if(null!==e){const s=Object.keys(e);for(let i=0,n=s.length;i<n;++i){const n=s[i];t[n]=e[n]}this.boundObservables=null}const s=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,s=it(e)||e;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||c.removeChildNodes(s),t&&(this.view=t.render(e,s,e))}static forCustomElement(t){const e=t.$fastController;if(void 0!==e)return e;const s=tt.forType(t.constructor);if(void 0===s)throw new Error("Missing FASTElement definition.");return t.$fastController=new nt(t,s)}}function rt(t){return class extends t{constructor(){super(),nt.forCustomElement(this)}$emit(t,e,s){return this.$fastController.emit(t,e,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,s){this.$fastController.onAttributeChangedCallback(t,e,s)}}}const ot=Object.assign(rt(HTMLElement),{from:t=>rt(t),define:(t,e)=>new tt(t,e).define().type});class lt{createCSS(){return""}createBehavior(){}}const at=(function(t,...e){const{styles:s,behaviors:i}=function(t,e){const s=[];let i="";const n=[];for(let r=0,o=t.length-1;r<o;++r){i+=t[r];let o=e[r];if(o instanceof lt){const t=o.createBehavior();o=o.createCSS(),t&&n.push(t)}o instanceof H||o instanceof CSSStyleSheet?(""!==i.trim()&&(s.push(i),i=""),s.push(o)):i+=o}return i+=t[t.length-1],""!==i.trim()&&s.push(i),{styles:s,behaviors:n}}(t,e),n=H.create(s);return i.length&&n.withBehaviors(...i),n})` :host{ /* this property prevents outside styles from affecting this component */ all: initial; } .text{ font-size: 20px; font-family: sans-serif; }`;var ht=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};const ct=(function(t,...e){const s=[];let i="";for(let n=0,r=t.length-1;n<r;++n){const r=t[n];let o=e[n];if(i+=r,o instanceof R){const t=o;o=()=>t}if("function"==typeof o&&(o=new k(o)),o instanceof m){const t=z.exec(r);null!==t&&(o.targetName=t[2])}o instanceof v?(i+=o.createPlaceholder(s.length),s.push(o)):i+=o}return i+=t[t.length-1],new R(i,s)})`<div class="text">Web component says: ${t=>t.greeting}</div>`;let dt=class extends ot{constructor(){super(...arguments),this.greeting="Hi"}greetingChanged(){console.log("greeting has changed!")}};var ut;ht([function(t,e){let s;function i(t,e){arguments.length>1&&(s.property=e),G.locate(t.constructor).push(s)}return arguments.length>1?(s={},void i(t,e)):(s=void 0===t?{}:t,i)}],dt.prototype,"greeting",void 0),dt=ht([(ut={name:"web-component-starter-fast",template:ct,styles:at},function(t){new tt(t,ut).define()})],dt);export{dt as WebComponentStarterFast};