function krestik() {
  let sec = document.querySelector(".section");
  sec.style = "display:none";
}

function sendDataToServer(title, description, type, price) {
  const data = {
    title: title,
    description: description,
    type: type,
    price: price,
  };

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      console.log("Дані успішно відправлені на сервер");
      // Додаткові дії при успішній відправці
    })
    .catch((error) => {
      console.error("Помилка при відправці даних:", error);
    });
}

const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", pop);

function pop() {
  let sec = document.querySelector(".section");
  sec.style = "display:block";

  // get data from inputs
  const getAddBtn = document.getElementsByClassName("btnAdd")[0];

  getAddBtn.addEventListener("click", (e) => {
    // Отримати доступ до елемента select за допомогою його name або іншого атрибуту
    const type = document.querySelector('select[name="type"]').value;

    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const price = document.getElementById("priceInput").value;
    // Передача URL-адреси зображення, якщо вона є
    const image = document.getElementById("imageInput").files[0];

    // Відправка даних на сервер
    sendDataToServer(title, description, type, price, image);

    const contentDiv = document.querySelector(".content");
    const newDiv = document.createElement("div");
    newDiv.className = "boxContent " + type;

    const titleElement = document.createElement("span");
    titleElement.className = "titleContent";
    titleElement.textContent = title;

    const price1 = document.createElement("span");
    price1.className = "price";
    price1.textContent = "Ціна:" + price + " грн.";

    const descriptionSpan = document.createElement("span");
    descriptionSpan.className = "descriptionContent";
    descriptionSpan.textContent = description;

    //const imgElement = document.createElement("img");
    //imgElement.className = "imageContent"; // Встановлення класу
    //imgElement.src = URL.createObjectURL(img);

    //newDiv.appendChild(imgElement);

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    const delBtn = document.createElement("button");
    delBtn.textContent = "del";

    //create container for button "del and edit"
    const parrentBtn = document.createElement("div");
    parrentBtn.className = "parrentBtn";
    parrentBtn.appendChild(editBtn);
    parrentBtn.appendChild(delBtn);

    // Додавання елементів до нового діву

    newDiv.appendChild(parrentBtn);
    newDiv.appendChild(titleElement);
    newDiv.appendChild(descriptionSpan);
    newDiv.appendChild(price1);
    // Додавання нового діву до вмісту
    contentDiv.appendChild(newDiv);

    document.querySelector(".section").style = "display:none";
  });
}
