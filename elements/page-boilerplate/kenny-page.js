/*
Component to use for each page
*/
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "../kenny-social.js";
import "./kenny-banner.js";

/**
 * `kenny-page`
 * Component to use for each page
 * 
 * @demo index.html
 * @element kenny-page
 */
export class KennyPage extends DDDSuper(I18NMixin(LitElement)) {

    static get tag() {
        return "kenny-page";
    }

    constructor() {
        super();
        this.page = "home";
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
            page: { type: String },
        };
    }

    // Lit scoped styles
    static get styles() {
        return [super.styles,
        css`
        /* Light Theme */
      :host {
        --bg-color: var(--ddd-theme-default-shrineTan);
        --text-color: var(--ddd-theme-default-landgrantBrown);
      }

      /* Dark Theme */
      @media(prefers-color-scheme: dark) {
        :host {
          --bg-color: var(--ddd-theme-default-landgrantBrown);
          --text-color: var(--ddd-theme-default-roarLight);
        }
      }
        :host {
            display: block;
            color: var(--text-color);
            background-color: var(--bg-color);
            font-family: var(--ddd-font-navigation);
        }
        .wrapper {
            justify-content: center;
            align-items: center;
            text-align: center;
        }
    `];
    }

    // Lit render the HTML
    render() {
        return html`
            <div class="wrapper">
            <slot></slot>
            </div>`;
    }
}

globalThis.customElements.define(KennyPage.tag, KennyPage);
