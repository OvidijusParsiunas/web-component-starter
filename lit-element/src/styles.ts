import { css } from 'lit-element';

export const styles = css`
  :host {
    /* this property prevents outside styles from affecting this component */
    all: initial;
  }

  .text {
    font-size: 20px;
    font-family: sans-serif;
  }
`