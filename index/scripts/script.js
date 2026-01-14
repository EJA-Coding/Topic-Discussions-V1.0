let inputElement = document.querySelector('.text')
let profilePicture = 'profile'


const username = sessionStorage.getItem('username');
if (username === null) {
    window.location.href = "login-page.html";
}
else {

    document.querySelector('.text').readOnly = true;

    const firstLetter = username.charAt(0).toUpperCase()
    console.log(firstLetter)
    document.querySelector('.profile-container').innerHTML = firstLetter

    function scrollChatToBottom() {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    console.log(username);
    function getMessageInput(event) {
        if (event.key === 'Enter') {
            sendMessage()

        }

    }

    function sendMessage() {
        if (inputElement.value !== '' && inputElement.value.trim() !== '') {
            const inserData = JSON.parse(localStorage.getItem('UsersStored'))
            const messageDiv = document.createElement('div')
            const userDiv = document.createElement('div')
            const userDate = document.createElement('div')
            const date = document.createElement('div')
            const userPicture = document.createElement('div')
            const chat = document.querySelector('.js-chat')
            userDate.classList.add('user-date')
            date.classList.add('message-date')
            messageDiv.classList.add('message')
            userDiv.classList.add('username')
            const dateJS = dayjs().format('DD/MM/YY - HH:mm')
            userPicture.classList.add('user-picture-container')
            date.innerHTML = `${dateJS}`
            messageDiv.innerText = inputElement.value
            userDiv.innerText = username
            userPicture.innerHTML = firstLetter
            userDate.appendChild(date)
            chat.appendChild(userDiv)
            chat.appendChild(userDate)
            chat.appendChild(userPicture)
            chat.appendChild(messageDiv)
            document.querySelector('.no-message').classList.add('display')

            for (let i = 0; i < inserData.length; i++) {
                if (inserData[i].username === username) {
                    for (let j = 0; j < inserData[i].data.length; j++) {
                        if (inserData[i].data[j].topicName === document.querySelector('.topic-name').innerText) {
                            inserData[i].data[j].messages.push({
                                content: inputElement.value,
                                user: username,
                                date: dateJS,
                                profilePicture: firstLetter
                            })
                        }
                    }
                }
            }

            console.log(inserData)
            localStorage.setItem('UsersStored', JSON.stringify(inserData))

            inputElement.value = ''
            scrollChatToBottom()
            document.querySelector('.js-typing').innerHTML = ''
            document.querySelector('.js-typing').classList.remove('js-typing-background')


        }
    }

    function getMessages(message) {
        const userDiv = document.createElement('div')
        const userDate = document.createElement('div')
        const date = document.createElement('div')
        const userPicture = document.createElement('div')
        const chat = document.querySelector('.js-chat')
        const messageDiv = document.createElement('div')
        userDate.classList.add('user-date')
        date.classList.add('message-date')
        messageDiv.classList.add('message')
        userDiv.classList.add('username')
        userPicture.classList.add('user-picture-container')

        userDiv.innerText = message.user
        date.innerText = message.date
        userPicture.innerText = message.profilePicture
        messageDiv.innerText = message.content

        userDate.appendChild(date)

        chat.appendChild(userDiv)
        chat.appendChild(userDate)
        chat.appendChild(userPicture)
        chat.appendChild(messageDiv)

    }

    function loadMessages(topicID) {
        const chat = document.querySelector('.js-chat')
        chat.innerHTML = ''
        const usersData = JSON.parse(localStorage.getItem('UsersStored'))

        for (let i = 0; i < usersData.length; i++) {
            if (usersData[i].username === username) {
                for (let j = 0; j < usersData[i].data.length; j++) {
                    if (usersData[i].data[j].topicName === topicID) {
                        const messages = usersData[i].data[j].messages
                        for (let k = 0; k < messages.length; k++) {
                            getMessages(messages[k])
                        }
                    }
                }
            }
        }

        if (chat.innerHTML === '') {
            document.querySelector('.no-message').classList.remove('display')
        } else {
            document.querySelector('.no-message').classList.add('display')
        }
    }

    function isUserTyping(event) {
        if (event.key) {
            const typing = document.querySelector('.js-typing')
            document.querySelector('.js-typing').innerText = `${username} is typing...`
            typing.classList.add('js-typing-background')
            if (event.key === 'Enter') {
                document.querySelector('.js-typing').innerHTML = ''
                typing.classList.remove('js-typing-background')
            }
            if (inputElement.value === '') {
                document.querySelector('.js-typing').innerHTML = ''
                typing.classList.remove('js-typing-background')
            }
            if (event.key === 'Backspace') {
                document.querySelector('.js-typing').innerHTML = ''
                typing.classList.remove('js-typing-background')
            }
        }
    }
    const topicName = document.querySelector('.topic-name')
    const popUp = document.querySelector('.name-topic')

    function isEnter(event) {
        if (event.key === 'Enter') {
            createTopic()
        }
    }

    function showPopUp() {
        popUp.classList.add('show')
        document.querySelector('body').classList.add('pointer')
        document.querySelector('.topic-get').classList.add('affiche')
    }

    function closePopUp() {
        popUp.classList.remove('show')
        document.querySelector('body').classList.remove('pointer')
        document.querySelector('.error1').classList.remove('showerror')
        document.querySelector('.topic-get').classList.remove('affiche')
        document.querySelector('.topic-create-input').value = ''
    }

    function createTopic() {
        document.querySelector('.topic-get').classList.remove('affiche')

        const topicTypedName = document.querySelector('.topic-create-input')

        let topicID = topicTypedName.value.trim()
        if (topicID === '') {
            console.error('cannot create topics error code : 1')
            document.querySelector('.error1').classList.add('showerror')
            document.querySelector('.error1').innerHTML = 'A topic already has this name'
        } else {
            const usersData = JSON.parse(localStorage.getItem('UsersStored'))
            for (let i = 0; i < usersData.length; i++) {
                if (usersData[i].username === username) {
                    usersData[i].data.push({
                        topicName: topicID,
                        messages: []
                    })

                    getTopics(topicID)

                }
            }
            localStorage.setItem('UsersStored', JSON.stringify(usersData))
            topicTypedName.value = ''
            popUp.classList.remove('show')
            document.querySelector('body').classList.remove('pointer')
            document.querySelector('.error1').classList.remove('showerror')


        }
    }

    const getTopicsStorage = JSON.parse(localStorage.getItem('UsersStored'))

    for (let i = 0; i < getTopicsStorage.length; i++) {
        if (getTopicsStorage[i].username === username) {

            for (let j = 0; j < getTopicsStorage[i].data.length; j++) {
                const topicName = getTopicsStorage[i].data[j].topicName
                getTopics(topicName)
                console.log('done!')
            }

        }
    }


    function getTopics(topicID) {
        const newTopic = document.createElement('div');
        newTopic.classList.add('topics')
        newTopic.innerHTML = `${topicID} <img src="index/pictures/484662.png" class="delete-topic-icon" onclick="deleteTopic(this, event)">`
        newTopic.onclick = function () {

            // déselectionne les autres topics
            document.querySelectorAll('.topics')
                .forEach(t => t.classList.remove('topics-selected'));

            newTopic.classList.add('topics-selected');
            topicName.innerText = topicID;
            document.querySelector('.text').readOnly = false;

            loadMessages(topicID)

        };
        document.querySelector('.topics-container').appendChild(newTopic)
    }


    function deleteTopic(imgElement, event) {
        imgElement.parentElement.remove();
        const topicDiv = imgElement.parentElement
        const topicTitle = topicDiv.childNodes[0].textContent.trim()
        topicName.innerHTML = ''
        event.stopPropagation();
        const usersData = JSON.parse(localStorage.getItem('UsersStored'))
        for (let i = 0; i < usersData.length; i++)
            if (usersData[i].username === username) {
                for (let j = 0; j < usersData[i].data.length; j++) {
                    if (usersData[i].data[j].topicName === topicTitle) {
                        usersData[i].data.splice(j, 1)
                        break
                    }
                }
            }
        localStorage.setItem('UsersStored', JSON.stringify(usersData))

    }

    function getProfileInfos() {
        const userInfos = document.querySelector('.profile-infos')
        if (!userInfos) {
            console.error('profile-infos not found in DOM')
            return
        }

        const username = sessionStorage.getItem('username')
        const creationDate = sessionStorage.getItem('date')

        userInfos.innerHTML = `
        <div class="one">
            <div class="profile">${username.charAt(0).toUpperCase()}</div>
            <p class="username-style">${username}</p>
            <br>
            <span class="creation-date">Signed up on ${creationDate}</span>
        </div>
        <div class="two">
            <hr class="line">
            <p class="user-bio">Juste là pour discuter et faire des rencontres sympa.</p>
        </div>
        <button class="log-out-button" onclick="logOut()">LOG OUT</button>
    `

        userInfos.classList.toggle('open')
        document.body.classList.toggle('pointer')
    }

    function logOut() {
        window.location.href = "../../../login-page.html";
    }


    /* ------------------------------NOTIFS------------------------------- */


    let notifCount = 7

    const notifsElementContainer = document.querySelector('.notif-count-container')
    const notifsElement = document.querySelector('.notif-count')
    notifsElement.innerHTML = notifCount


    function updateNotif() {
        if (notifCount === undefined) {
            console.error('error while loading notifs');
            notifCount = 0;
            notifsElement.innerHTML = notifCount
        }

        if (notifCount === 0) {
            notifsElementContainer.classList.add('cache')
        } else {
            notifsElementContainer.classList.remove('cache')
        }

        if (notifCount < 10) {
            notifsElement.classList.add('notif-count-less')
        } else {
            notifsElement.classList.remove('notif-count-less')
        }

        if (notifCount > 99) {
            notifsElement.innerHTML = '99+'
            notifsElement.classList.add('notif-count-plus')
        } else {
            notifsElement.classList.remove('notif-count-plus')
        }
    }

    updateNotif()
    const notifsContainer = document.querySelector('.see-notifs')

    function seeNotifs() {
        notifCount = 0
        updateNotif()
        notifsContainer.classList.toggle('show')
    }


    function newNotif() {
        updateNotif()
    }

    /* --------------------------------------------------SETTINGS------------------------------------------------- */

    const settingsPage = document.querySelector('.full-settings');

    function showSettings() {
        settingsPage.classList.toggle('get-settings')
        document.querySelector('.global-container').classList.toggle('pointer')
    }




    /* --------------------------------------------------EVENTS------------------------------------------------- */

    document.querySelector('.profile-container').addEventListener("click", getProfileInfos)

    document.querySelector('.topic-get').addEventListener("click", closePopUp)

    document.querySelector('.profile-get').addEventListener("click", getProfileInfos)

    document.querySelector('.topic-create-button').addEventListener("click", createTopic)

    document.querySelector('.close-picture').addEventListener("click", closePopUp)

    document.querySelector('.create-button').addEventListener("click", showPopUp)

    document.querySelector('.send-button').addEventListener("click", sendMessage)

    document.querySelector('.notifications-container').addEventListener("click", seeNotifs)

    document.querySelector('.general-settings').addEventListener("click", showSettings)

    document.querySelector('.close-settings').addEventListener("click", showSettings)

    document.querySelector('.topic-create-input').addEventListener("keydown", (event) => { isEnter(event); })

    /*
    document.querySelector('.text').addEventListener("keydown", (event) => { getMessageInput(event); })
    
    document.querySelector('.text').addEventListener("keydown", (event) => { isUserTyping(event); })
    */

}