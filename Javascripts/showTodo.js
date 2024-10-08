import getCurrentTimeStatus from "./timeLogic.js"
const title = document.querySelector(".title")
const description = document.querySelector(".description")
const submit = document.querySelector(".submit")
const allTodos = document.querySelector(".allTodos")
const nameOfUser = document.querySelector(".nameOfUser")
const noText = document.querySelector(".noText")
const deleteAccount = document.querySelector(".deleteAccount")
const popOut = document.querySelector(".popOut")

const getIt = JSON.parse(localStorage.getItem("selectedTodo"));

const threeDots = document.getElementById('threeDots');
const sidebar = document.getElementById('sidebar');

threeDots.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // Toggles the "active" class
});

deleteAccount.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const confirmed = confirm("Do you want to delete your account?")
    // const obj = {id : getIt.userId};
    if (confirmed) {
        try {
            const response = await fetch("http://localhost:3000/user_delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",  // Proper header for JSON
                    "token": token,
                },


            })
            const response2 = await fetch("http://localhost:3000/delete_todo_all", {
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

                alert("User deleted successfull!");
                window.location = "./index.html"
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

// document.addEventListener("load", getTodos)
// let allDatas;
async function getTodos() {
    const obj = {};
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    caches
    // console.log(token)
    try {
        const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "token": token,
            },
            body: JSON.stringify(obj),
            // token: localStorage.getItem("token")
        })
        // console.log("success")
        const data = await response.json()
        // console.log("data: ", data);
        allTodos.innerHTML = "";
        if (data.ans.length >= 1) {

            // localStorage.setItem 
            data.ans.forEach(e => {
                // console.log(e.title);

                allTodos.innerHTML += `
                <div class="todoBox">
                   <div class="todoHead">
                       <div class="noteTitle">${e.title}</div>
                       
                   </div>
                   <div class="todoBody">
                   <p class="readmore">Read more.</p>
                   </div>
                </div>
                `
            })

            // const readMore = document.querySelectorAll(".readmore")
            const todoBox = document.querySelectorAll(".todoBox")
            // readMore.forEach((e, i) => {
            //     e.addEventListener("click", () => {
            //         console.log("clicked", i)
            //         // allDatas = data.ans[i];
            //         localStorage.setItem("selectedTodo", JSON.stringify(data.ans[i]))
            //         // console.log(allDatas)
            //         window.location = "./read_todo.html"
            //         return;
            //     })
            // })
            todoBox.forEach((e, i) => {
                e.addEventListener("click", () => {
                    // console.log("clicked", i)
                    // allDatas = data.ans[i];
                    localStorage.setItem("selectedTodo", JSON.stringify(data.ans[i]))
                    // console.log(allDatas)
                    window.location = "./read_todo.html"
                    return;
                })
            })
        }
        else {
            noText.textContent = "No tasks yet...";
        }
    }
    catch (error) {
        // console.log(error)
        return;
    }
}
getTodos()


submit.addEventListener("click", async () => {
    if (title.value === "" || description.value === "") {
        popOut.classList.add("active");
        popOut.textContent = "Both the fields are required";
        setTimeout(() => {
            popOut.classList.remove("active");

        }, 3000)

        return;
    }


    try {
        const todoData = {
            title: title.value,
            description: description.value
        }
        // console.log(todoData)
        const token = localStorage.getItem("token");
        // console.log("Got token", token)
        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "token": token,
            },
            body: JSON.stringify(todoData)
        })

        const newData = await response.json();
        // console.log(newData);
        getTodos()
        title.value = "";
        description.value = "";

        // console.log("Success!")
    }
    catch (error) {
        // console.log(error)
        return;
    }
})

