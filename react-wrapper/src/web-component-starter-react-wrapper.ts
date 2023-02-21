import {WebComponentStarter as WebComponentStarterCore} from 'web-component-starter';
import {createComponent} from '@lit-labs/react';
import * as React from 'react';

export const WebComponentStarter = createComponent({
  tagName: 'web-component-starter',
  elementClass: WebComponentStarterCore,
  react: React,
  events: {
    onactivate: 'activate',
    onchange: 'change',
  },
});
