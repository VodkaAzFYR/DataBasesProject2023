const dateLessons = document.querySelector("#input-date");
const className = document.querySelector("#input-class-name");
const sendDataBtn = document.querySelector("#send-data");
const subjectColumn = document.querySelector("#items-container-subjects");
const teacherColumn = document.querySelector("#items-container-teachers");
const lessonTimeColumn = document.querySelector("#items-container-time-range");

sendDataBtn.addEventListener("click", handleSendDataToServer);

async function handleSendDataToServer() {
  const dateLessonsValue = dateLessons.value;
  const classNameValue = className.value;

  // const dateParts = dateLessonsValue.split("-");
  // const year = dateParts[2];
  // const month = dateParts[1];
  // const day = dateParts[0];

  // const reversedDate = year + "-" + month + "-" + day;
  const url = "http://127.0.0.1:8000/get_lessons_plan?";
  
  try {
    subjectColumn.innerHTML = "";
    teacherColumn.innerHTML = "";
    lessonTimeColumn.innerHTML = "";

    const response = await fetch(url + "date=" + dateLessonsValue + "&class_name=" + classNameValue);
    const data = await response.text(); // Otrzymany ciąg znaków

    // Przetwarzanie danych
    const lessonsArray = [];
    const tuples = data.substring(2, data.length - 2).split("), (");
    
    tuples.forEach((tuple) => {
      const values = tuple.split(", ");
    
      const lessonName = values[0].substring(1, values[0].length - 1);
      const teacherFirstName = values[1].substring(1, values[1].length - 1);
      const teacherLastName = values[2].substring(1, values[2].length - 1);
      const startTime = values[3].substring(1, values[3].length - 1);
      const endTime = values[4].substring(1, values[4].length - 1);
    
      // Dodaj lekcję do tablicy
      lessonsArray.push([lessonName, teacherFirstName, teacherLastName, startTime, endTime]);
    
      // Dodaj dane do struktury HTML
    
      // Tworzenie elementów HTML
      const subjectName = document.createElement("span");
      subjectName.textContent = lessonName;
    
      const teacherName = document.createElement("span");
      teacherName.textContent = teacherFirstName + " " + teacherLastName;
    
      const lessonTime = document.createElement("span");
      lessonTime.textContent = startTime + " - " + endTime;
    
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
