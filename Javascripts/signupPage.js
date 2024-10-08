// import axios from './axios';

const username = document.querySelector(".name")
const email = document.querySelector(".email")
const password = document.querySelector(".password")
const confirmPassword = document.querySelector(".ConfirmPassword")
const submit = document.querySelector(".submit")
const loginButton = document.querySelector(".loginButton")

const confirmError = document.querySelector(".confirm_error")
const nameError = document.querySelector(".name_error")
const emailError = document.querySelector(".email_error")
const passwordError = document.querySelector(".password_error")
const popOut = document.querySelector(".popOut")
const noError = document.querySelector(".noError")


submit.addEventListener("click", () => {
    if (username.value === "") {
        username.style.border = ".5vh solid red";
        nameError.style.display = "block"
    }
    if (email.value === "") {
        email.style.border = ".5vh solid red"
        emailError.style.display = "block"
    }
    if (password.value === "") {
        password.style.border = ".5vh solid red"
        passwordError.style.display = "block"
    }
    if (confirmPassword.value === "") {
        confirmPassword.style.border = ".5vh solid red"
        confirmError.style.display = "block"
    }
    else {
        if (password.value !== confirmPassword.value) {
            confirmPassword.value = "";
            confirmPassword.placeHolder = "Password should match"
        }
        else {
            confirmError.style.display = "none";
            const data = {
                email: email.value,
                name: username.value,
                password: confirmPassword.value
            }
            console.log(data)
            async function signUp() {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify(data)

                })
                if (!response.ok) {
                    const data = await response.json()
                    // console.log("data: ", data)
                    // console.log(data.error)
                    if (data.message) {
                        popOut.classList.add("active");
                        popOut.textContent = data.message[0];
                    }
                    else {
                        // popOut.classList.add("center")
                        // console.log("Hit.....")
                        // console.log(data.error)
                        // console.log(confirmError)
                        noError.textContent = data.error;
                        noError.style.display = "block"
                        // confirmError.style.display = "block"
                    }
                    setTimeout(() => {
                        popOut.classList.remove("active");
                        // popOut.classList.remove("center")
                    }, 3000)

                }
                else {
                    window.location = "./login.html"
                }
                // console.log("Done")

            }
            signUp();

        }
    }

})
confirmPassword.addEventListener("click", () => {
    confirmPassword.style.border = ".5vh solid transparent";
})
password.addEventListener("click", () => {
    password.style.border = ".5vh solid transparent";
})
username.addEventListener("click", () => {
    username.style.border = ".5vh solid transparent";
})
email.addEventListener("click", () => {
    email.style.border = ".5vh solid transparent";
})