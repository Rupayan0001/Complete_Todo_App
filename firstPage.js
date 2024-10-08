const login = document.querySelector(".login")
const signup = document.querySelector(".signup")
const submit = document.querySelector(".submit")
const popOut = document.querySelector(".popOut")

submit.addEventListener("click", () => {
    popOut.classList.add("active");

    setTimeout(() => {
        popOut.classList.remove("active");
    }, 3000)

})