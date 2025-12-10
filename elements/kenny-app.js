/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-boilerplate/kenny-page.js";
import "./kenny-calendar.js";
import "./kenny-carousel.js";
import "./kenny-event.js";
import "./kenny-image.js";

/**
 * `kenny-app`
 * 
 * @demo index.html
 * @element kenny-app
 * 
 * Main routing component that uses kenny-page as boilerplate
 */
export class KennyApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "kenny-app";
  }

  constructor() {
    super();
    this.route = window.location.pathname || "/";
    this.initRouting();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      route: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
    `];
  }

  initRouting() {
    // Handle initial page load
    this.route = window.location.pathname;
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.route = window.location.pathname;
    });
  }

  handleNavigation(e) {
    if (e.detail && e.detail.path) {
      this.route = e.detail.path;
      window.history.pushState({}, "", e.detail.path);
    }
  }

  renderPage() {
    if (this.route.startsWith("/schedule")) {
      return html`
        <kenny-page page="schedule">
          <h2>Full Schedule</h2>
          <kenny-calendar></kenny-calendar>

          <p>Events coming up!</p>
          <kenny-event></kenny-event>
          <kenny-event></kenny-event>
          <kenny-event></kenny-event>
        </kenny-page>
      `;
    }
    
    if (this.route.startsWith("/team")) {
      return html`
        <kenny-page page="team">
          <h2>Meet the Team!</h2>
          <p>Our amazing players and staff who make everything possible.</p>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-page>
      `;
    }
    
    if (this.route.startsWith("/about")) {
      return html`
        <kenny-page page="about">
          <h2>About Kenny Sports</h2>
          <p>Kenny Sports is dedicated to promoting sportsmanship, teamwork, and excellence in athletics. 
            Our mission is to provide a supportive environment for athletes of all levels to grow and succeed.</p>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-page>
      `;
    }
    
    // Default home page
    return html`
      <kenny-page page="home">
        <h2>Welcome to Kenny Sports!</h2>

        <kenny-carousel>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-carousel>

        <p>Check out our upcoming events:</p>
        <kenny-event></kenny-event>
      </kenny-page>
    `;
  }

  // Lit render the HTML
  render() {
    return html`${this.renderPage()}`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(KennyApp.tag, KennyApp);