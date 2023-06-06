const classes = document.querySelector("#select-class")
const subjects = document.querySelector("#select-subject")
const teachers = document.querySelector("#select-teacher")

// const tabClasses = ["1A", "2A", "3C", "5Z", "9F"]
// const tabsubjects = ["Matematyka", "Polski", "Angielski", "Historia"]
// const tabTeachers = ["Mateusz Kozłowski", "Rafał Mastalerz", "Kamil Zieliński"]

async function insertClasses() {
    const url = "http://127.0.0.1:8000/get_subjects"
    const response = await fetch(url)
    const res = await response.json()
    tabClasses = res
    tabClasses.forEach((element) => {
        optionElement = document.createElement("option")
        optionElement.text = element
        classes.appendChild(optionElement)
    })
    console.log("Wywołano funckję 1")
}
async function insertSubjects(){
    const url = "http://127.0.0.1:8000/get_subjects"
    const response = await fetch(url)
    const res = await response.json()
    tabsubjects = res
    tabsubjects.forEach((element) => {
        optionElement = document.createElement("option")
        optionElement.text = element
        subjects.appendChild(optionElement)
    })
    console.log("Wywołano funckję 2")
}
async function insertTeachers(){
    const url = "http://127.0.0.1:8000/get_subjects"
    const response = await fetch(url)
    const res = await response.json()
    tabTeachers = res
    tabTeachers.forEach((element) => {
        optionElement = document.createElement("option")
        optionElement.text = element
        teachers.appendChild(optionElement)
    })
    console.log("Wywołano funckję 3")
}

insertClasses()
insertSubjects()
insertTeachers()



// if (res.includes("||")) {
//     subject_list = res.split("||")
// } else {
//     subject_list = res
// }
// const insert_element = document.querySelector(".select-subject")
// let temp_element = ""