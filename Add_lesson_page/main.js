const classes = document.querySelector("#select-class")
const subjects = document.querySelector("#select-subject")
const teachers = document.querySelector("#select-teacher")
const dataLesson = document.querySelector("#input-date")
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
    console.log(typeof res)
    const tabSubjects = res

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
    console.log(typeof res)
    const tabTeachers = res

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
    const dateLesson = dataLesson.value;
    const startLesson = startLesson.value;

    const data = {
        className: className,
        subject: subject,
        teacher: teacher,
        dateLesson: dateLesson,
        startLesson: startLesson
    };

    fetch('http://127.0.0.1:8000/get_lesson_plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log("Response:", response)
    })
    .catch(error => {
        console.log("Error:", error)
    });
}