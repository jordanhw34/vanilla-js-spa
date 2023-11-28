import AbstractView from './AbstractView.js';

export default class Settings extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Settings');
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>
                This is some text on the settings page!
            </p>
        `;
    }
}