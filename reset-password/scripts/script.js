function resetPassword() {
    const email = document.querySelector('.email-input').value
    const newPassword = document.getElementById('new-password').value
    const Users = JSON.parse(localStorage.getItem('UsersStored'))

    if (newPassword.trim() === '') {
        console.log('Please enter a new password.')
        return
    }


    for (let i = 0; i < Users.length; i++) {
        let userFound = false
        if (Users[i].username === email) {
            Users[i].password = newPassword
            userFound = true
            console.log('User found')
            localStorage.setItem('UsersStored', JSON.stringify(Users))
            console.log(JSON.parse(localStorage.getItem('UsersStored')))
            window.location.href = "login-page.html"
            break
        }


    }
    if (userFound === false) {
        console.log('User not found')
    }

}