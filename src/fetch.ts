import {parse, HTMLElement} from 'node-html-parser';


type PageSummary = {
    title: string,
}

async function run() {
    let response = await fetch('https://medium.com/@priscillashamin/how-to-install-and-configure-nvm-on-mac-os-43e3366c75a6');
    let htmlString = await response.text();
    let document = parse(htmlString);
    processMeta(document);

    let result: PageSummary = {
        title: document.querySelector('title').text,
    };
    console.log(result);
}

function processMeta(document: HTMLElement) {
    let metas = document.querySelectorAll('meta');
    let result: { [key: string]: string } = {};

    metas.forEach((tag) => {
        let key: string | false = false;
        if (tag.attributes['property']) {
            key = tag.attributes['property'];
        }
        if (tag.attributes['name']) {
            key = tag.attributes['name'];
        }
        if (key === false) {
            return;
        }
        result[key] = tag.attributes['content'];
    });
    console.log(result);
}

run();