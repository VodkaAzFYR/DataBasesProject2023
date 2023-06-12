const classes = document.querySelector("#select-class")
const subjects = document.querySelector("#select-subject")
const teachers = document.querySelector("#select-teacher")
const dataLesson = document.querySelector("#input-date")
const startLessonInput = document.querySelector("#input-start-lesson")
const endLessonInput = document.querySelector("#input-end-lesson")
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

async function handleSendDataToServer(){
    const className = classes.value;
    const subject = subjects.value;
    const teacher = teachers.value;
    const dateLesson = dataLesson.value;
    const startLesson = startLessonInput.value;
    const endLesson = endLessonInput.value;

    const obj = {
        "class_name": className,
        "subject_name": subject,
        "teacher_name": teacher,
        "lesson_date": dateLesson,
        "start_lesson": startLesson,
        "end_lesson": endLesson
    };
    const data = JSON.stringify(obj);
    console.log(data)
    await fetch('http://127.0.0.1:8000/add_lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        alert("Wystąpił błąd: " + error)
      });
}
