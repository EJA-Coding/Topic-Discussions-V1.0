let usernames;
const users = JSON.parse(localStorage.getItem('UsersStored'))
console.log(users)

function getUsername() {
    const inputPassword = document.querySelector('.password').value
    const inputUser = document.querySelector('.user').value;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === inputUser) {
            console.log('User found')
            if (users[i].password === inputPassword) {
                console.log('User + Password correct')
                usernames = users[i].username
                sessionStorage.setItem('username', usernames)
                sessionStorage.setItem('date', users[i].date)
                window.location.href = "index.html";
            } else {
                console.log('User + Password Incorrect')
                document.querySelector('.wrong-input').classList.add('display')
                setTimeout(function () {
                    document.querySelector('.wrong-input').classList.remove('display')
                }, 2000)
            }
        } else {
            document.querySelector('.wrong-input').classList.add('display')
            setTimeout(function () {
                document.querySelector('.wrong-input').classList.remove('display')
            }, 2000)
        }
    }
    /*
    if (user.value === '' || password.value === '') {
        
    } else {
        username = user.value;
        sessionStorage.setItem('username', username);
        window.location.href = "index.html";
    }
    */

}



function checkEnter(event) {
    if (event.key === "Enter") {
        getUsername();
    }
}

function showPassword() {
    const passwordInput = document.querySelector('.password')
    const passwordContainer = document.querySelector('.pasword-input-container')
    const firstValue = passwordInput.value
    passwordContainer.innerHTML = `<input type="text" placeholder="Password" class="password"
    onkeydown="checkEnter(event)">
    <button class="see-password" onclick="hidePassword()"><img src="login/pictures/hide-password.png" class="hide-password-picture"></button>`
    const newInput = document.querySelector('.password')
    newInput.value = firstValue
}

function hidePassword() {
    const passwordInput = document.querySelector('.password')
    const passwordContainer = document.querySelector('.pasword-input-container')
    const firstValue = passwordInput.value
    passwordContainer.innerHTML = `<input type="password" placeholder="Password" class="password"
    onkeydown="checkEnter(event)">
    <button class="see-password" onclick="showPassword()"><img src="login/pictures/show-password.png" class="see-password-picture"></button>`
    const newInput = document.querySelector('.password')
    newInput.value = firstValue
}

/* --------------------------------------------------EVENTS------------------------------------------------- */

document.querySelector('.see-password').addEventListener("click", showPassword)

document.querySelector('.log-in-button').addEventListener("click", getUsername)

document.querySelector('.password').addEventListener("keydown", (event) => { checkEnter(event); })