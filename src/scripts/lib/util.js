const root                     = document.getElementById('root')
const load_icon                = document.querySelector('.load-view__body__pannel__icon_type_4 .icon')
const load_view                = document.querySelector('.load-view')
const load_view_body_close     = document.querySelector('.load-view__body__close')
const top_page                 = document.querySelector('.top-page')
const top_page__wrap           = document.querySelector('.top-page .wrap')


export const preload = (images, fn, process) => {
    const len = images.length
    let load = 0

    images.forEach((image, key) => {
        const img = new Image()
        img.src = image
        img.onload = () => {
            load += 1
            process({
                size: len,
                load: load,
                per: load / len
            })
            if(load >= len) fn()
        }
    })
}

export const setRingSize = () => {
    const default_size = 650
    const window_size = top_page.clientHeight
    const per = window_size / default_size

    top_page__wrap.style.transform = `scale(${ per })`
}



export const bindNav = () => {
    const navs = document.querySelectorAll('.top-page__global-nav a')

    //navs.forEach((nav, key) => {
    //    nav.addEventListener('mouseover',e => {
    //        const color = e.target.getAttribute('data-color')
    //        top_page.setAttribute('data-color', color)
    //    })
    //
    //    nav.addEventListener('mouseout', e => {
    //        top_page.setAttribute('data-color','')
    //    })
    //
    //    nav.addEventListener('click', e => {
    //        e.preventDefault()
    //        const state = !(page_box.getAttribute('data-state') === 'true')
    //        const href = e.target.getAttribute('data-href')
    //
    //        page_box.setAttribute('data-state', state)
    //        showPage(href)
    //    })
    //
    //})

}


export const showPage = selector => {
    document.querySelector(`.${selector}`).style.display = 'block'
}


export const hiddenPage = () => {
    document.querySelector('.profile-page').style.display = 'none'
    document.querySelector('.history-page').style.display = 'none'
    document.querySelector('.memories-page').style.display = 'none'
    document.querySelector('.product-page').style.display = 'none'
}


export const startLoading = fn => {
    load_icon.addEventListener('animationend', fn)
}

export const finLoad = () => {
    load_view.setAttribute('data-state', 'start')

    load_view_body_close.addEventListener('animationend', e =>{
        if(e.animationName === 'load-view__close-2') {
            root.removeChild(load_view)
            //startGabAnimation()
        }
    })
}