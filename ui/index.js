import React from 'react';
import ReactDOM from 'react-dom';
import Services from './components/Services';
import {tag, h1, div} from './dom';
import config from '../config.json';

import 'whatwg-fetch';

const style = {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 300,
    fontSize: '18px',
    textAlign: 'center',
    maxWidth: 800,
    margin: '20px auto',
    padding: '0 20px'
};

const meta = [
    tag('meta')({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
    })()
];

const title = h1({style: {
    fontSize: '52px',
    fontFamily: style.fontFamily,
    fontWeight: 300,
    margin: '0',
}})('node', tag('strong')({style: {fontWeight: 400}})('beats'));

const description = tag('p')('Nodebeats is a simple node server that you can post data to. The purpose of this is to post heartbeats from you services. Heartbeats is used as a monitoring mechanism. When a service hasn\'t received a heartbeat in a while it is considered dead, and you might want to check whatsup. This UI is a simple demo of how it can look.');

const html = div({style: style})
    (title, description);

window.onload = () => {
    document.body.style.opacity = 0;
    meta.forEach(m => document.head.appendChild(m));

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.appendChild(html);

    /* Add the react component */
    let reactContainer = tag('div')({style: {
        maxWidth: 600,
        margin: '20px auto'
    }})();

    ReactDOM.render(<Services url={config.url} services={config.services} />, reactContainer);
    html.appendChild(reactContainer);

    setTimeout(function () {
        document.body.style.opacity = 1;
    }, 50);
};

/** Google fonts */
window.WebFontConfig = {
    google: { families: [ 'Lato:100,400:latin' ] }
};

(function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
