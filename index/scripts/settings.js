function themeSettings() {
    document.querySelector('.page-settings-theme').classList.toggle('opacity')

}

function changeTheme() {
    const slider = document.querySelector('.slider');
    const switchs = document.querySelector('.switch');
    const left = document.querySelector('.left-section')
    const mainTopic = document.querySelector('.main-topic')
    const createTopic = document.querySelector('.create-button')
    const right = document.querySelector('.global-right-section')
    const middle = document.querySelector('.topic-infos')
    const createPopup = document.querySelector('.name-topic')
    const seeNotif = document.querySelector('.see-notifs')
    const notifs = document.querySelectorAll('.real-notif')
    const notif = document.querySelector('.not-seen-notif')
    const settings = document.querySelectorAll('.test-settings')
    const pageSettings = document.querySelector('.page-settings')
    const setting = document.querySelector('.left-section-settings')

    document.querySelector('body').classList.toggle('light-main')
    middle.classList.toggle('light-main')
    switchs.classList.toggle('green');
    slider.classList.toggle('on');
    left.classList.toggle('light')
    mainTopic.classList.toggle('light')
    createTopic.classList.toggle('light')
    right.classList.toggle('light')
    createPopup.classList.toggle('light')
    notifs.forEach(setting => {
        setting.classList.toggle('light');
    });
    notif.classList.toggle('light')
    seeNotif.classList.toggle('light')
    settings.forEach(setting => {
        setting.classList.toggle('light');
    });
    pageSettings.classList.toggle('light')
    setting.classList.toggle('light')
}

document.querySelector('.test-settings').addEventListener("click", themeSettings)

document.querySelector('.switch').addEventListener("click", changeTheme)