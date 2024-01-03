document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");
  const setupInitialButton = document.getElementById("setupInitial");

  function editProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (products[index]) {
      const product = products[index];
      form.name.value = product.name;
      form.description.value = product.description;
      form.imageLink.value = product.imageLink;
      form.productCode.value = product.productCode;
      form.supplier.value = product.supplier;
      form.dataset.editIndex = index;
    }
  }

  window.editProduct = editProduct;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const productData = {
      name: form.name.value,
      description: form.description.value,
      imageLink: form.imageLink.value,
      productCode: form.productCode.value,
      supplier: form.supplier.value
    };

    if (form.dataset.editIndex) {
      updateProduct(productData, form.dataset.editIndex);
      delete form.dataset.editIndex;
    } else {
      saveProduct(productData);
    }

    form.reset();
    displayProducts();
  });

  setupInitialButton.addEventListener("click", () => {
    setInitialProducts();
  });

  function updateProduct(productData, index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[index] = productData;
    localStorage.setItem("products", JSON.stringify(products));
  }

  function setInitialProducts() {
    const initialProducts = [
      {
        name: "1",
        description: "1",
        imageLink: "https://img.freepik.com/free-photo/vertical-shot-of-a-boat-with-a-beautiful-landscape_181624-48227.jpg?w=740&t=st=1704283589~exp=1704284189~hmac=984c090c78e8eda2699d2a21a3d08124558f4db8aa789b51f5399942b0268345",
        productCode: "1",
        supplier: "PMI"
      },
      {
        name: "2",
        description: "2",
        imageLink: "https://img.freepik.com/free-photo/tall-ship-sailing-on-the-calm-water_181624-18234.jpg?w=360&t=st=1704283549~exp=1704284149~hmac=c3d99cfb11bda7770a28f1c1a526b33e9c552727aa925e4d6ef6a795ba7de91b",
        productCode: "2",
        supplier: "PMI"
      }
    ];
    localStorage.setItem("products", JSON.stringify(initialProducts));
    displayProducts();
  }

  function saveProduct(productData) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(productData);
    localStorage.setItem("products", JSON.stringify(products));
  }

  function displayProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(products);
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
              <p><strong>Имя:</strong> ${product.name}</p>
              <p><strong>Описание:</strong> ${product.description}</p>
              <img src="${product.imageLink}" alt="${product.name}">
              <p><strong>Код товара:</strong> ${product.productCode}</p>
              <p><strong>Поставщик:</strong> ${product.supplier}</p>
              <button onclick="deleteProduct(${index})">Удалить</button>
          `;
      const editButton = document.createElement("button");
      editButton.textContent = "Редактировать";
      editButton.addEventListener("click", () => editProduct(index));
      card.appendChild(editButton);
      productList.appendChild(card);
    });
  }

  window.deleteProduct = (index) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
  };
  displayProducts();
});