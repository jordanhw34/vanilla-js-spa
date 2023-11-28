import AbstractView from './AbstractView.js';

export default class ViewPost extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('View Post');
    }

    async getHtml() {
        let thisParams = this.params;
        console.log(thisParams);
        let postId = this.params.id;
        console.log(`postId = ${postId}`);
        return `
            <h1>View Post #${postId}</h1>
            <p>
                This is some text on the posts page!
            </p>
        `;
    }
}