import AbstractView from './AbstractView.js';

export default class NotFound extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('404 Not Found');
    }

    async getHtml() {
        return `
            <h1>404</h1>
            <p>
                We cannot find what you're looking for :-(
            </p>
        `;
    }
}