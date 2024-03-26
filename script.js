const searchEngine = document.getElementById('searchEngine');
searchEngine.style.borderBottomRightRadius = '25px';
var engineLink = document.getElementById('searchForm');
const searchInput = document.getElementById('search')
const body = document.querySelector('body')
body.classList = localStorage.getItem('theme')

// setting user setted theme 
function setTheme (){
    let theme = localStorage.getItem('theme')
    if(theme == null){
        localStorage.setItem('theme', 'skyblue')
    };
    body.classList = localStorage.getItem('theme')
}



//  search box radias fixing ------------------
window.addEventListener('DOMContentLoaded', async () => {






    // searchEngine Animation and designing --------//

    searchEngine.addEventListener('focusin', () => {
        searchEngine.style.borderBottomRightRadius = 0;
    })
    searchEngine.addEventListener('focusout', () => {
        searchEngine.style.borderBottomRightRadius = '25px';
    })
    searchEngine.addEventListener('change', async () => {
        searchEngine.style.borderBottomRightRadius = '25px';

        // changing search engine link 
        let selectLink = await searchEngine.value;
        if (selectLink == 'google') {
            engineLink.action = 'https://www.google.com/search';
            searchInput.name = 'q'
        } else if (selectLink == 'bing') {
            engineLink.action = 'https://www.bing.com/search';
            searchInput.name = 'q'
        } else if (selectLink == 'yahoo') {
            engineLink.action = 'https://search.yahoo.com/search';
            searchInput.name = 'p'
        } else {
            engineLink.action = 'https://www.google.com/search'
            searchInput.name = 'q'
        }

    })



    // date function
    const time = new Date()
    const day = time.getDay()
    const dayLoader = document.getElementById('day');
    const timeLoader = document.getElementById('time');
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thusday',
        'Friday',
        'Satureday',
        'Sunday'
    ]
    const months = [
        'January',
        'Frebruary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    dayLoader.innerText = days[day].toUpperCase();
    timeLoader.innerText = `${date}, ${months[month]}, ${year}`;





    // setting preload for logos-----------
    // preloadIcons =()=>{
    //     const icons = document.querySelectorAll('img')
    //     let linkTag = '';
    //     icons.forEach(icon => {
    //         linkTag += `<link rel="prefetch" as="image" type="image/png" href="${icon.src}">`
    //     });
    //     document.querySelector('#link').innerHTML = linkTag;
    // }
    // preloadIcons()




})


// url and prompt checker 
function isLink(str) {
    // Regular expression to match URLs with optional protocol
    var urlPattern = /^(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[\w-]*)*\/?)$/;

    return urlPattern.test(str);
}

const submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('submit', ()=>{
    let qurey = searchInput.value;
    if (isLink(qurey) == true){
        engineLink.stopPropagation();
        window.location.href(qurey)
    } else {
        window.location.href('https://sbkingdom.app')
    }
})





const popup = document.querySelectorAll('.popup')
const popupbg = document.getElementById('popupbg')
closePopup =()=>{
    popup.forEach(e => {
        e.classList.remove('show')
    });
    popupbg.style.display = 'none'
    togglesvg.classList.remove('rotate')
    popupValue = 0
    mailToggle.style.zIndex = ''
    bottom.style.zIndex = ''
    mainSdiv.style.zIndex = ''
}
popupbg.addEventListener('click',  closePopup);




// const lazyloading = document.querySelectorAll('.ab')
const allAppBox = document.getElementById('allAppPopup')
const appbtn = document.getElementById('toggleApp')
const togglesvg = document.getElementById('icr')
const bottom = document.getElementById('bottom')
appbtn.addEventListener('click', async()=>{
    if (allAppBox.classList != 'show') {

        allAppBox.classList = 'show';
        togglesvg.classList = 'rotate'
        popupbg.style.display = 'block'
        bottom.style.zIndex = 3

    } else {

        allAppBox.classList.remove('show');
        // allAppBox.classList.add('hide');
        togglesvg.classList.remove('rotate')
        popupbg.style.display = 'none'
        bottom.style.zIndex = ''

    }
})


// mail popup section ----------
const toggleMail = document.getElementById('ToggleMailBtn')
const mailToggle = document.getElementById('mailToggle')
const emails = document.querySelectorAll('.emails')
var popupValue = 0
toggleMail.addEventListener('click', () =>{
    if (popupValue != 1) {
        emails.forEach(e => {
            e.classList.add('show')
        });
        popupbg.style.display = 'block'
        popupValue = 1
        mailToggle.style.zIndex = 3
    } else {
        emails.forEach(e => {
            e.classList.remove('show')
        });
        mailToggle.style.zIndex = ''
        popupbg.style.display = 'none'
        popupValue = 0
    }
})



// setting color / themes ---------------

const themeInput = document.querySelectorAll('.themes')
const settingbtn = document.getElementById('settingbtn')
const settingBody = document.getElementById('settingBody')
const mainSdiv = document.getElementById('setting')

settingbtn.addEventListener('click', ()=>{
    if (popupValue != 1) {
        settingBody.classList.add('show')
        mainSdiv.style.zIndex = 3
        popupValue = 1
        popupbg.style.display = 'block'
    } else {
        popupValue = 0;
        settingBody.classList.remove('show');
        mainSdiv.style.zIndex = 0;
        popupbg.style.display = 'none';
    }
})



themeInput.forEach(inp => {

    inp.addEventListener('change', function (){
        if (this.checked) {
            let colorValue = this.value
            if (colorValue == 'dark') {
                alert('Dark Mode is in under development. Please Use other theme to avoid color issues')
            }
            localStorage.setItem('theme', colorValue)
        }
        setTheme()
    })
});

