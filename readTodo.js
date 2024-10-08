import getCurrentTimeStatus from "./timeLogic.js"
const description = document.querySelector(".description")
const title = document.querySelector(".title")
const submit = document.querySelector(".submit")
const deleteTodo = document.querySelector(".deleteTodo")
const nameOfUser = document.querySelector(".nameOfUser")
const logo = document.querySelector(".logo")

const threeDots = document.getElementById('threeDots');
const sidebar = document.getElementById('sidebar');
const top = document.querySelector('.top');
const logOut = document.querySelector(".logOut")
const deleteAccount = document.querySelector(".deleteAccount")
const popOut = document.querySelector(".popOut")

const getIt = JSON.parse(localStorage.getItem("selectedTodo"));
const Username = localStorage.getItem("name");
// console.log(getIt)

title.value = getIt.title;
description.value = getIt.description;
nameOfUser.textContent = `${getCurrentTimeStatus()}, ${Username}`;

logo.addEventListener("click", () => {
    window.location = "./show_todo.html"
})

logOut.addEventListener("click", () => {
    localStorage.clear();
    popOut.classList.add("active")
    popOut.textContent = "You are Logged out!"
    setTimeout(() => {
        popOut.classList.remove("active")
        window.location = "./index.html";
    }, 2000)
})

threeDots.addEventListener('click', () => {
    threeDots.classList.toggle("on")
    sidebar.classList.toggle('active'); // Toggles the "active" class
});

top.addEventListener("click", () => {
    console.log("Clicked")
    if (sidebar.classList.contains("active")) {
        threeDots.classList.toggle("on")
        sidebar.classList.toggle('active');
    }
})
deleteAccount.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const confirmed = confirm("Do you want to delete your account?")
    // const obj = {id : getIt.userId};
    if (confirmed) {
        try {
            const response = await fetch("https://complete-todo-app-backend-1.onrender.com/user_delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",  // Proper header for JSON
                    "token": token,
                },


            })
            const response2 = await fetch("https://complete-todo-app-backend-1.onrender.com/delete_todo_all", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",  // Proper header for JSON
                    "token": token,
                },
                // body : JSON.stringify(obj)


            })
            // console.log(response2)


            if (response.ok) {
                // console.log(response)

                popOut.classList.add("active");
                popOut.textContent = "User deleted successfull! ✔"

                setTimeout(() => {
                    popOut.classList.remove("active");
                    window.location = "./index.html"

                }, 2000)

                // alert("User deleted successfull!");
                return;
            }
            else {
                // console.log(response)
                return;
            }
        }
        catch (error) {
            // console.log(error)
            return;
        }
    }
    else {
        sidebar.classList.toggle('active');
    }
})
// title.addEventListener("input", () => {
//     console.log("Change")
//     submit.style.transition = ".8s";
//     submit.style.opacity = 1;
// })

// description.addEventListener("input", () => {
//     console.log("Change")
//     submit.style.transition = ".8s";
//     submit.style.opacity = 1;
// })

const oldTitle = title.value;
const oldDescription = description.value;

submit.addEventListener("click", async () => {
    if (title.value === oldTitle && description.value === oldDescription) {
        window.location = "./show_todo.html";
        return
    }
    const obj = {
        title: title.value,
        description: description.value,
    }
    // console.log(obj)
    try {
        const token = localStorage.getItem("token");
        // console.log(token)
        const result = await fetch("https://complete-todo-app-backend-1.onrender.com/todo_update", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "token": token
            },
            body: JSON.stringify(obj)
        })
        // console.log(result)
        if (result.ok) {
            // console.log("success");
            window.location = "./show_todo.html"
            return;
        }
        else {
            // console.log("failed")
            return;
        }
    }
    catch (error) {
        // console.log(error)
        return;
    }
})
deleteTodo.addEventListener("click", async () => {
    const todoId = { id: getIt._id };
    try {

        const token = localStorage.getItem("token");
        const response = await fetch("https://complete-todo-app-backend-1.onrender.com/delete_todo", {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "token": token
            },
            body: JSON.stringify(todoId),
        })
        if (response.ok) {
            const data = response.json();
            // console.log(data);
            window.location = "./show_todo.html";
            return;
        }
        // else {
        //     // console.log("Failed")
        // }
    }
    catch (error) {
        // console.log(error)
        return;
    }

})