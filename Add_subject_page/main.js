const subjectName = document.querySelector("#input-subject-name")

subjectName.addEventListener("click", handleSendDataToServer)

function handleSendDataToServer(){
    const subjectNameValue = subjectName.value;
    let url = 'http://127.0.0.1:8000/add_subject?'
    const resp = fetch(url + 'class_name=' + className + "&subject_name=" + subject + "&teacher_name=" + firstNameTeacher + "&teacher_lastname=" + lastNameTeacher + "&lesson_date=" + dateLessonValue + "&start_lesson=" + startLessonValue + "&end_lesson=" + endLessonValue)
    // console.log(resp)
    // console.log(className, subject, firstNameTeacher, lastNameTeacher, dateLesson, startLessonValue, endLessonValue)
}