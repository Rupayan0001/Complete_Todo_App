import getCurrentTimeStatus from "./timeLogic"
const description = document.querySelector(".description")
const title = document.querySelector(".title")
const submit = document.querySelector(".submit")
const deleteTodo = document.querySelector(".deleteTodo")
const nameOfUser = document.querySelector(".nameOfUser")
const getIt = JSON.parse(localStorage.getItem("selectedTodo"));
const Username = localStorage.getItem("name");
// console.log(getIt)

title.value = getIt.title;
description.value = getIt.description;
nameOfUser.textContent = `${getCurrentTimeStatus()}, ${Username}`;

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
        const result = await fetch("http://localhost:3000/todo_update", {
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
        const response = await fetch("http://localhost:3000/delete_todo", {
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