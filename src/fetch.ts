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
    metas.forEach((tag) => {
        console.log(tag.attributes);
    });
}

run();