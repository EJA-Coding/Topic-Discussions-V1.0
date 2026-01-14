const email = document.querySelector('.user-input')
const firstPassword = document.querySelector('.password-input')
const confirmPassword = document.querySelector('.confirm-password-input')
let userPassword;
let userEmail;
let userNumber = JSON.parse(localStorage.getItem('usersID')) || 0

let storedUsers = JSON.parse(localStorage.getItem('UsersStored'))



function canCreateAccount() {
    if (email.value === '' || firstPassword.value === '' || confirmPassword.value === '') {
        console.log('not everything was entered')
        document.querySelector('.wrong-input').classList.add('display')
        setTimeout(function () {
            document.querySelector('.wrong-input').classList.remove('display')
        }, 2000)
    } else {
        if (firstPassword.value === confirmPassword.value) {
            userPassword = confirmPassword.value
            userEmail = email.value
            console.log('password is the same')
            storeUser()
        } else {
            console.log('password is not the same')
            document.querySelector('.wrong-input').classList.add('display')
            setTimeout(function () {
                document.querySelector('.wrong-input').classList.remove('display')
            }, 2000)
        }
    }

}

function checkForEnter(event) {
    if (event.key === 'Enter') {
        canCreateAccount()
    }
}

function storeUser() {



    let users = JSON.parse(localStorage.getItem('UsersStored')) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === userEmail) {
            console.log('username already taken')
            userNameTaken()
            return
        }
    }

    users.push({ username: userEmail, password: userPassword, date: dayjs().format('MMMM D, YYYY'), ID: userNumber + 1, data: [] });
    userNumber++
    localStorage.setItem('usersID', userNumber)
    localStorage.setItem('UsersStored', JSON.stringify(users));
    window.location.href = "login-page.html"
}

function userNameTaken() {
    document.querySelector('.wrong-input').classList.add('display')
    document.querySelector('.wrong-input').innerHTML = `<p class="wrong-text">Ce nom d'utlisateur/Email est déjà utilisé.</p>`
    setTimeout(function () {
        document.querySelector('.wrong-input').classList.remove('display')
        document.querySelector('.wrong-input').innerHTML = `<p class="wrong-text">Le mot de passe ou le nom d'utilisateur est incorrect.</p>`
    }, 2000)
}

/* --------------------------------------------------EVENTS------------------------------------------------- */
document.querySelector('.sign-up-button').addEventListener("click", canCreateAccount)

document.querySelector('.confirm-password-input').addEventListener("keydown", (event) => { checkForEnter(event); })
