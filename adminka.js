function krestik() {
  let sec = document.querySelector(".section");
  sec.style = "display:none";
}

function sendDataToServer(title, description, type, price, image) {
  const data = new FormData();
  data.append("image", image);
  data.append("title", title);
  data.append("description", description);
  data.append("type", type);
  data.append("price", price);

  fetch("http://localhost:3000/products", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: data,
  })
    .then((data) => {
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
    const btnAdd = document.querySelector(".btnAdd");
    btnAdd.style.display = "block";
    const saveBtn = document.querySelector(".btnSave");
    saveBtn.style.display = "none";
    document.querySelector(".section").style = "display:none";
  });
}

// Функція едіту
function updateProductToServer(id, title, description, type, price, image) {
  const data = new FormData();
  if (image) data.append("image", image);
  data.append("title", title);
  data.append("description", description);
  data.append("type", type);
  data.append("price", price);

  fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Дані продукту оновлено");
      } else {
        console.error("Помилка при оновленні даних:", response.status);
      }
    })
    .catch((error) => {
      console.error("Помилка при оновленні даних:", error);
    });
}

//Функція едіту

function editProduct(e, id) {
  const productDiv = e.target.closest(".boxContent");
  const title = productDiv.querySelector(".titleContent").textContent;
  const description = productDiv.querySelector(
    ".descriptionContent"
  ).textContent;
  const price = productDiv
    .querySelector(".price")
    .textContent.replace("Ціна:", "")
    .replace(" грн.", "");
  const type = productDiv.className.split(" ").pop();

  document.querySelector(".section").style.display = "block";
  document.getElementById("titleInput").value = title;
  document.getElementById("descriptionInput").value = description;
  document.querySelector('select[name="type"]').value = type;
  document.getElementById("priceInput").value = price;

  const btnAdd = document.querySelector(".btnAdd");
  btnAdd.style.display = "none";
  const saveBtn = document.querySelector(".btnSave");
  saveBtn.style.display = "block";

  saveBtn.addEventListener(
    "click",
    () => {
      const updatedTitle = document.getElementById("titleInput").value;
      const updatedDescription =
        document.getElementById("descriptionInput").value;
      const updatedType = document.querySelector('select[name="type"]').value;
      const updatedPrice = document.getElementById("priceInput").value;
      const updatedImage = document.getElementById("imageInput").files[0];

      updateProductToServer(
        id,
        updatedTitle,
        updatedDescription,
        updatedType,
        updatedPrice,
        updatedImage
      );

      document.querySelector(".section").style.display = "none";
      btnAdd.style.display = "block";
      saveBtn.style.display = "none";
    },
    { once: true }
  );
}
