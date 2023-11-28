import AbstractView from './AbstractView.js';

export default class Home extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
            <h1>Home</h1>
            <p>
                This is some text on the home page
            </p>
            <p>
                <a href='/posts' data-link>View recent posts</a>
            </p>
        `;
    }
}