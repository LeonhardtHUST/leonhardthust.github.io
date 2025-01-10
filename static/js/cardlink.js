'use strict'
// enable cardlink this way:
// [configJSON](https://example.com "cardlink")
function cardlinkRender(el) {
    const cardlinkTemplate = '\
    <img class="cardlink-avatar">\
    <span class="cardlink-title"></span>\
    <span class="cardlink-text"></span>\
    ';
    let config = el.textContent
    el.textContent = ''
    console.log(config)
    console.log(JSON.parse(config))
    config = JSON.parse(config)
    /* 
        A config should look like this:
        {
            "class": "customClass",
            "id": "customId",
            "title": "cardlink",
            "avatar": "https://example.com/image.jpg",
            "description": "This is a description"
        }
        class (optional): for injection.
        id (optional): for injection.
        avatar (optional): when not provided, the source will be set to /images/cardlink/{title}.webp
                    can be set to blank to disable.
        description (optional)
     */
    el.classList.add('cardlink-wrapper')
    el.insertAdjacentHTML('afterbegin', cardlinkTemplate)
    if (config.class != undefined)
        el.classList.add(...config.class.split(' '))
    if (config.id != undefined)
        el.setAttribute('id', config.id)
    el.setAttribute('title', config.title)
    el.querySelector('.cardlink-avatar').setAttribute('src', config.avatar || `/images/cardlink/${config.title}.webp`)
    el.querySelector('.cardlink-title').textContent = config.title
    el.querySelector('.cardlink-text').textContent = config.description
}
let targets = document.querySelectorAll('a[title="cardlink"]')
targets.forEach((value) => cardlinkRender(value))