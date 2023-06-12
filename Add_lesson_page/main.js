const classes = document.querySelector("#select-class")
const subjects = document.querySelector("#select-subject")
const teachers = document.querySelector("#select-teacher")
const dateLesson = document.querySelector("#input-date")
const startLesson = document.querySelector("#input-start-lesson")
const endLesson = document.querySelector("#input-end-lesson")
const sendDataBtn = document.querySelector("#send-data-btn")

async function insertClasses() {
    const url = "http://127.0.0.1:8000/get_classes"
    const response = await fetch(url)
    const res = await response.json()
    console.log(typeof res)
    tabClasses = res
    tabClasses.forEach((element) => {
        optionElement = document.createElement("option")
        optionElement.text = element
        classes.appendChild(optionElement)
    })
    console.log("Wywołano funckję 3")
} 
async function insertSubjects() {
    const url = "http://127.0.0.1:8000/get_subjects";
    const response = await fetch(url);
    const res = await response.text(); // Pobierz odpowiedź jako ciąg znaków
    const tabSubjects = JSON.parse(res)

    const object = {}
    tabSubjects.forEach((item, index) => {
        object[index] = item
    })

    tabSubjects.forEach((element) => {
        optionElement = document.createElement("option");
        optionElement.text = element;
        subjects.appendChild(optionElement);
    });

    console.log("Wywołano funkcję insertSubjects");
}

async function insertTeachers() {
    const url = "http://127.0.0.1:8000/get_teachers";
    const response = await fetch(url);
    const res = await response.text(); // Pobierz odpowiedź jako ciąg znaków
    const tabTeachers = JSON.parse(res)

    const object = {}
    tabTeachers.forEach((item, index) => {
        object[index] = item
    })


    tabTeachers.forEach((element) => {
        optionElement = document.createElement("option");
        optionElement.text = element;
        teachers.appendChild(optionElement);
    });

    console.log("Wywołano funkcję insertTeachers");
}


insertClasses()
insertSubjects()
insertTeachers()

sendDataBtn.addEventListener("click", handleSendDataToServer)

function handleSendDataToServer(){
    const className = classes.value;
    const subject = subjects.value;
    const teacher = teachers.value;
    const dateLessonValue = dateLesson.value;
    const startLessonValue = startLesson.value;
    const endLessonValue = endLesson.value;
    const firstNameTeacher = teacher.split(" ")[0]
    const lastNameTeacher = teacher.split(" ")[1]
    let url = 'http://127.0.0.1:8000/add_lessons?'
    const resp = fetch(url + 'class_name=' + className + "&subject_name=" + subject + "&teacher_name=" + firstNameTeacher + "&teacher_lastname=" + lastNameTeacher + "&lesson_date=" + dateLessonValue + "&start_lesson=" + startLessonValue + "&end_lesson=" + endLessonValue)
    // console.log(resp)
    // console.log(className, subject, firstNameTeacher, lastNameTeacher, dateLesson, startLessonValue, endLessonValue)
}


// function runbackend(){
//   const email = document.querySelector(".input-email").value
//   const password = document.querySelector(".input-password").value
//   let url = 'http://127.0.0.1:8000/login?'
//   const resp = fetch(url + 'email=' + email + "&password=" + password)
//   console.log(resp)
// }