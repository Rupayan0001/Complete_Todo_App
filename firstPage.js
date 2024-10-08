const login = document.querySelector(".login")
const signup = document.querySelector(".signup")
const submit = document.querySelector(".submit")
const popOut = document.querySelector(".popOut")
const logo = document.querySelector(".logo")

submit.addEventListener("click", () => {
    popOut.classList.add("active");

    setTimeout(() => {
        popOut.classList.remove("active");
    }, 3000)

});

logo.addEventListener("click", () => {
    window.location = "./index.html"
})