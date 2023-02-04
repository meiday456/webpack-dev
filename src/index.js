// import "./style.css"
// import icon from "./icon.jpg"
// import printMe from "./print"
//
// function component() {
//     const element = document.createElement('div');
//     const btn = document.createElement('button');
//     // 이 라인이 동작하려면 현재 스크립트를 통해 포함된 Lodash가 필요합니다.
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     element.classList.add('hello');
//
//     btn.innerHTML = 'Click me and check the console'
//     btn.onclick = printMe
//     // const myIcon = new Image();
//     // myIcon.src = icon;
//     // element.appendChild(myIcon)
//     element.appendChild(btn)
//
//
//
//     return element;
// }
//
// document.body.appendChild(component());

function getComponentThen() {
    return import('lodash').then(({default: _}) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }).catch((error) => 'An error occurred while loading the component')
}

async function getComponent(){
    const element = document.createElement('div')
    const {default : _} = await import('lodash')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component);
})