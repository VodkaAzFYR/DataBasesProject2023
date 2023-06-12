const teacherFirstName = document.querySelector("#input-firstname-teacher")
const teacherLastName = document.querySelector("#input-lastname-teacher")
const sendDataToServer = document.querySelector("#send-data-to-server")

sendDataToServer.addEventListener("click", handleSendDataToServer)

function handleSendDataToServer(){
    const teacherFirstNameValue = teacherFirstName.value;
    const teacherLastNameValue = teacherLastName.value;
    let url = 'http://127.0.0.1:8000/add_teacher?'
    const resp = fetch(url + 'teacher_name=' + teacherFirstNameValue + "&teacher_lastname=" + teacherLastNameValue)
    console.log(resp)
    // console.log(className, subject, firstNameTeacher, lastNameTeacher, dateLesson, startLessonValue, endLessonValue)
}