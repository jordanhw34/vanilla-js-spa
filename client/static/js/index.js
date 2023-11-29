import Home from './views/Home.js';
import Posts from './views/Posts.js';
import ViewPost from './views/ViewPost.js';
import Settings from './views/Settings.js';
import NotFound from './views/NotFound.js';
//import * as fs from "fs";
const fs = require('fs');


/*  TO-DO
    - edit the text of the to-do
    - re-order the to-do items
    - store to-do items in json file for persistance
*/


// RegExp allows us to get to the paramaterized field => i.e. /posts/2 => returns 2
const pathToRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');


// 1 limitation here is that multiple params are not supported; i.e. posts/4/3 (will currently return 4/3 as the sole param)
const getParams = (match) => {
    const values = match.result.slice(1);
    console.log(`values == ${values}`);
    
    // This keys array will pickup mutliple params for example /posts/2/4 (would get the 2 and 4)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((res) => res[1]);

    //console.log('Keys:'); console.log(keys);

    return Object.fromEntries(keys.map((key, i) => {
        //console.log('Inside Object.fromEntries: key, i');
        //console.log(key); console.log(i);
        return [key, values[i]];
    }));
}

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {    
    
    // Define Routes
    // Currently supports single params in URL (e.x. /posts/3 is okay, /posts/3/5 is not)
    const routes = [
        { path: '/404', view: NotFound },
        { path: '/', view: Home },
        { path: '/posts', view: Posts },
        { path: '/posts/:id', view: ViewPost },
        { path: '/settings', view: Settings }
    ];

    // Check each defined route to see if the current route is defined
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    // Find the Match
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    //console.log('match:'); console.log(match); console.log(`!match = ${!match}`);

    // 404 Handler => Current path is not defined in routes
    if ( !match ) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    //console.log('View:'); console.log(view); console.log(view.params);

    document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if ( event.target.matches('[data-link]') ) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });
    router();
});