let fakeApi = 'http://localhost:3000/infor'

function start() {
    getCourse(renderCourse)
    addCourse()
    updateCourse()
}
start()

function getCourse(callback) {
    fetch(fakeApi)
        .then((response)=>{
            return  response.json()
        })  
        .then(callback)
}

function handleAddCourse(data, callback) {
    fetch(fakeApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response)=>{
            return response.json()
        })
        .then(callback)
}

function handelDeleteCourse(id) {
    fetch(fakeApi + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response)=>{
            return response.json()
        })
        .then(()=>{
            let courseItem = document.querySelector(".course-item-" + id)
            if(courseItem) {
                courseItem.remove()
            }
        })
}

function handelUpdateCourse(id) {
    let inputID = document.querySelector('input[name="inputID"]').value
    let inputTitle = document.querySelector('input[name="inputTitle"]').value
    let myData = {
        id: inputID,
        title: inputTitle
    }
    fetch(fakeApi + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myData) 
    })
        .then((response)=>{
            return response.json()
        })
        .then(()=>{
            getCourse(renderCourse)
        })
}

function addCourse() {
    let addButtonCourse = document.querySelector("#buttonAddd")
    addButtonCourse.addEventListener("click", ()=>{
        let inputID = document.querySelector('input[name="inputID"]').value
        let inputTitle = document.querySelector('input[name="inputTitle"]').value
        let myData = {
            id: inputID,
            title: inputTitle
        }
        handleAddCourse(myData, ()=>{
            getCourse(renderCourse)
        })
    })
}

function renderCourse(courses) {
    let courseBlock = document.querySelector("#blockContainer")
    let html = courses.map((course)=>{
        return `
            <li class="course-item-${course.id}">
                <h4>${course.id}</h4>
                <p>${course.title}</p>
                <button onclick="handelDeleteCourse(${course.id})">Xoá</button>
                <button id="buttonUpdate" onclick="handelUpdateCourse(${course.id})">Sửa</button>
            </li>
        `
    }) 
    courseBlock.innerHTML = html.join('')
}
