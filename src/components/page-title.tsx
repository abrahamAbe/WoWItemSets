import { LitElement, html, customElement } from 'lit-element'

@customElement('page-title')
export class MyElement extends LitElement {

    render() {
        return html`<span>World of Warcraft Item Sets</span>`
    }
}