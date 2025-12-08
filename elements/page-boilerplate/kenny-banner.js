import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `kenny-banner`
 * Banner at the top of each page, with buttons to direct you to different pages.
 * home button, schedule, team, about
 * 
 * @demo index.html
 * @element kenny-banner
 */
export class KennyBanner extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "kenny-banner";
    }

    constructor() {
        super();
        this.mobileMenuOpen = false;
        this.isMobile = window.matchMedia("(max-width: 768px)").matches;
        
        this._handleResize = this._handleResize.bind(this);
        this._handleButtonClick = this._handleButtonClick.bind(this);
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
            mobileMenuOpen: { type: Boolean, reflect: true, attribute: 'mobile-menu-open' },
            isMobile: { type: Boolean }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this._mediaQuery = window.matchMedia("(max-width: 768px)");
        this._mediaQuery.addEventListener('change', this._handleResize);
        this.addEventListener('kenny-button-click', this._handleButtonClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._mediaQuery?.removeEventListener('change', this._handleResize);
        this.removeEventListener('kenny-button-click', this._handleButtonClick);
    }

    _handleResize(e) {
        this.isMobile = e.matches;
        // Close mobile menu when switching to desktop
        if (!e.matches && this.mobileMenuOpen) {
            this.mobileMenuOpen = false;
        }
    }

    _toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    _handleButtonClick(e) {
        // Close all other dropdowns when one is clicked
        const clickedButton = e.detail.button;
        const buttons = this.querySelectorAll('kenny-button');
        
        buttons.forEach(button => {
            if (button !== clickedButton) {
                button.closeDropdown();
            }
        });
    }

    // Lit scoped styles
    static get styles() {
        return [super.styles,
        css`
            /* Light Theme */
            :host {
                --bg-color: var(--ddd-theme-default-roarLight);
                --text-color: var(--ddd-theme-default-potentialMidnight);
            }

            /* Dark Theme */
            @media(prefers-color-scheme: dark) {
                :host {
                --bg-color: var(--ddd-theme-default-shrineTan);
                --text-color: var(--ddd-theme-default-landgrantBrown);
                }
            }

            :host {
                display: block;
                width: 100%;
                background-color: var(--text-color);
            }
            .header {
                width: 100%;
                background-color: var(--bg-color);
                padding: var(--ddd-spacing-4) var(--ddd-spacing-6);
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
            }
            .nav-left {
                display: flex;
                align-items: center;
                gap: var(--ddd-spacing-4);
            }
            .nav-right {
                display: flex;
                align-items: center;
                gap: var(--ddd-spacing-4);
            }
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                cursor: pointer;
                padding: var(--ddd-spacing-2);
                color: var(--ddd-theme-default-potentialMidnight);
                font-size: var(--ddd-font-size-xl);
                min-width: 44px;
                min-height: 44px;
            }

            /* Mobile styles */
            @media (max-width: 768px) {
                .header {
                    flex-wrap: wrap;
                    padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
                }
                .mobile-menu-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nav-right {
                    display: none;
                    width: 100%;
                    flex-direction: column;
                    gap: var(--ddd-spacing-2);
                    margin-top: var(--ddd-spacing-3);
                }
                :host([mobile-menu-open]) .nav-right {
                    display: flex;
                }
                ::slotted([slot="buttons"]) {
                    width: 100%;
                }
            }
        `];
    }

    // Lit render the HTML
    render() {
        return html`
            <header class="header">
                <div class="nav-left">
                    <slot name="logo"></slot>
                </div>
                <button 
                    class="mobile-menu-toggle"
                    @click="${this._toggleMobileMenu}"
                    aria-label="Toggle menu"
                    aria-expanded="${this.mobileMenuOpen}">
                    ${this.mobileMenuOpen ? '✕' : '☰'}
                </button>
                <div class="nav-right">
                    <slot name="buttons"></slot>
                </div>
            </header>
        `;
    }
}

globalThis.customElements.define(KennyBanner.tag, KennyBanner);