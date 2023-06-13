const dateLessons = document.querySelector("#input-date");
const className = document.querySelector("#input-class-name");
const sendDataBtn = document.querySelector("#send-data");
const subjectColumn = document.querySelector(".subject-column");
const teacherColumn = document.querySelector(".teacher-column");
const lessonTimeColumn = document.querySelector(".lesson-time-column");
const subjectTitle = document.querySelector(".subject-name")
const teacherTitle = document.querySelector(".teacher-name")
const lessonTimeRange = document.querySelector(".lesson-time-range")

sendDataBtn.addEventListener("click", handleSendDataToServer);

async function handleSendDataToServer() {
  const dateLessonsValue = dateLessons.value;
  const classNameValue = className.value;

  const dateParts = dateLessonsValue.split("-");
  const year = dateParts[2];
  const month = dateParts[1];
  const day = dateParts[0];

  const reversedDate = year + "-" + month + "-" + day;
  const url = "http://127.0.0.1:8000/get_lessons_plan?";
  
  try {
    subjectColumn.innerHTML = "";
    teacherColumn.innerHTML = "";
    lessonTimeColumn.innerHTML = "";

    // Ustawienie tytułów
    subjectTitle.innerText = "Przedmiot";
    teacherTitle.innerText = "Nauczyciel";
    lessonTimeRange.innerText = "Godzina";

    const response = await fetch(url + "date=" + reversedDate + "&class_name=" + classNameValue);
    const data = await response.text(); // Otrzymany ciąg znaków

    // Przetwarzanie danych
    let i = 0
    const lessonsArray = [];
    const tuples = data.substring(2, data.length - 2).split("), (");
    
    tuples.forEach((tuple) => {
        let lessonName
        const values = tuple.split(", ");
        if (i == 0){
            lessonName = values[0].substring(2, values[0].length - 1);
        }
        else{
            lessonName = values[0].substring(1, values[0].length - 1);
        }
        i++
      const teacherFirstName = values[1].substring(1, values[1].length - 1);
      const teacherLastName = values[2].substring(1, values[2].length - 1);
      const startTime = values[3].substring(1, values[3].length - 1);
      const endTime = values[4].substring(1, values[4].length - 1);
    
      // Dodaj lekcję do tablicy
      lessonsArray.push([lessonName, teacherFirstName, teacherLastName, startTime, endTime]);
    
      // Dodaj dane do struktury HTML
    
      // Tworzenie elementów HTML
      const subjectName = document.createElement("p");
      subjectName.textContent = lessonName;
    
      const teacherName = document.createElement("p");
      teacherName.textContent = teacherFirstName + " " + teacherLastName;
    
      const lessonTime = document.createElement("p");
      let splittedStartTime = startTime.split(':').slice(0, 2)
      let formattedStartTime = splittedStartTime.join(":")
      let splittedEndTime = endTime.split(':').slice(0, 2)
      let formattedEndTime = splittedEndTime.join(":")
      lessonTime.textContent = formattedStartTime + " - " + formattedEndTime;
    
      // Dodawanie elementów do odpowiednich kolumn
      subjectColumn.appendChild(subjectName);
      teacherColumn.appendChild(teacherName);
      lessonTimeColumn.appendChild(lessonTime);
    });
    
    console.log(lessonsArray); // Tablica z lekcjami
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
}
