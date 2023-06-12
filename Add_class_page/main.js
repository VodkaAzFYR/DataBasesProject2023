const className = document.querySelector("#input-classname")
const sendDataToServer = document.querySelector("#send-data-to-server")

sendDataToServer.addEventListener("click", handleSendDataToServer)

function handleSendDataToServer(){
    const classNameValue = className.value;
    let url = 'http://127.0.0.1:8000/add_class?'
    const resp = fetch(url + 'class_name=' + classNameValue)
    console.log(resp)
    // console.log(className, subject, firstNameTeacher, lastNameTeacher, dateLesson, startLessonValue, endLessonValue)
}