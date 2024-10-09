
// import axios from './axios';

import host from "./host.js"
const email = document.querySelector(".email")
const password = document.querySelector(".password")

const submit = document.querySelector(".submit")
const signupButton = document.querySelector(".signupButton")
const emailError = document.querySelector(".email_error")
const passwordError = document.querySelector(".password_error")
const popOut = document.querySelector(".popOut")


submit.addEventListener("click", () => {

    if (email.value === "") {
        email.style.border = ".5vh solid red"
        emailError.style.display = "block"
    }
    if (password.value === "") {
        password.style.border = ".5vh solid red"
        passwordError.style.display = "block"
    }

    else {
        console.log(`${host}/login`)
        emailError.style.display = "none";
        passwordError.style.display = "none"
        const data = {
            email: email.value,

            password: password.value
        }
        // console.log(data)
        async function login() {
            const response = await fetch(`${host}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify(data)

            })
            if (!response.ok) {
                const data = await response.json()
                console.log("data", data)
                popOut.classList.add("active");
                popOut.textContent = data.message;
                setTimeout(() => {
                    popOut.classList.remove("active");

                }, 3000)

            }
            const newData = await response.json()
            // console.log(newData.token)
            // console.log("Done")
            localStorage.setItem("token", newData.token)
            localStorage.setItem("name", newData.name)
            window.location = "./show_todo.html"



        }
        login();
    }

})

password.addEventListener("click", () => {
    password.style.border = ".5vh solid transparent";
})

email.addEventListener("click", () => {
    email.style.border = ".5vh solid transparent";
})