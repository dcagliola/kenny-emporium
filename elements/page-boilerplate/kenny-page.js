/*
Component to use for each page - includes header, footer, and slot for content
*/
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "../kenny-social.js";
import "./kenny-banner.js";
import "./kenny-animated.js";
import "./kenny-button.js";

const kennyHome1 = new URL("./images/kenny-home1.png", import.meta.url).href;
const kennyHome2 = new URL("./images/kenny-home2.png", import.meta.url).href;

/**
 * `kenny-page`
 * Boilerplate component for each page with header, footer, and content slot
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
            border-radius: var(--ddd-radius-lg);
        }

        .body {
            padding: var(--ddd-spacing-4);
            margin: 0;
        }

        .wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .content {
            flex: 1;
        }
        `];
    }

    // Lit render the HTML
    render() {
        return html`
            <div class="wrapper">
                <div class="header">
                    <kenny-banner>
                        <kenny-animated 
                            link="/home"
                            slot="logo" 
                            src="${kennyHome1}"
                            hoveredSrc="${kennyHome2}">
                        </kenny-animated>
                        <kenny-button slot="buttons" label="Schedule" link="/schedule">
                            <a href="/schedule">Schedule Page</a>
                            <a href="/schedule/games">Games</a>
                            <a href="/schedule/practice">Practice</a>
                        </kenny-button>
                        <kenny-button slot="buttons" label="Team" link="/team">
                            <a href="/team">Team Page</a>
                            <a href="/team/roster">Roster</a>
                            <a href="/team/coaches">Coaches</a>
                        </kenny-button>
                        <kenny-button slot="buttons" label="About" link="/about">
                            <a href="/about">About Page</a>
                            <a href="/about/contact">Contact</a>
                            <a href="/about/mission_statement">Mission Statement</a>
                        </kenny-button>
                    </kenny-banner>
                </div>

                <div class="body content">
                    <slot></slot>
                </div>

                <div class="footer">
                    <kenny-social></kenny-social>
                </div>
            </div>
        `;
    }
}

globalThis.customElements.define(KennyPage.tag, KennyPage);