let user = JSON.parse(localStorage.getItem("user"))

if (!user) {
  alert("You must login or register in order to access this page");
  window.location.href = "register.html";
}

let form = document.querySelector("form");
let show = document.getElementById("list");

form.addEventListener("submit", (elem) => {
  let productName = elem.target.product.value;
  let productPrice = elem.target.price.value;
  let checkStatus = 0;

  if (productName == "" && productPrice == "") {
    alert("PLease Enter the product name or price");
    return;
  }

  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  for (let check of userData) {
    if (check.productName == productName) {
      checkStatus = 1;
      break;
    }
  }

  if (checkStatus == 1) {
    alert("Product Name already exists");
  } else {
    userData.push({
      productName: productName,
      productPrice: productPrice,
    });

    localStorage.setItem("userDetails", JSON.stringify(userData));
    displayData()
    calTotal()
  }

  elem.target.product.value = "";
  elem.target.price.value = "";
});

let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = ``;

  userData.forEach((elem, i) => {
    finalData += `<div class="show bg-sky-800 rounded p-4 mb-2 flex justify-between">
      <p class="name-${i} p-2 text-2xl w-1/4 flex justify-center">${elem.productName}</p>
      <p class="price-${i} p-2 text-2xl w-1/4 flex justify-center">${elem.productPrice}</p>
      <button onclick="remove(this , ${i})"><i class="fa-solid fa-trash-can text-xl"></i></button>
      <button onclick="updateForm(${i})"><i class="fa-solid fa-pen-fancy"></i></button>
      </div>`;
  });

  show.innerHTML = finalData;
};

let updateForm = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  const product = userData[index];

  let update = `<div class="bg-gray-700 p-4 rounded mb-4 responsiveBox">
      <input
        type="text"
        id="updateName"
        value="${product.productName}"
        placeholder="Enter new product name"
        class="w-1/3 p-2 rounded bg-cyan-950 border border-gray-700 mr-2"
        id="resDirection"
      />
      <input
        type="text"
        id="updatePrice"
        value="${product.productPrice}"
        placeholder="Enter new price"
        class="w-1/3 p-2 rounded bg-cyan-950 border border-gray-500 mr-2 outline-none"
        id="resDirection1"
      />
      <button onclick="update(${index})" class="bg-gray-800 px-4 py-2 rounded">Save</button>
      <button onclick="cancelUpdate()" class="bg-red-500 p-2 rounded">Cancel</button>
    </div>`;

    const itemToUpdate = document.querySelector(`.name-${index}`).parentElement;
    itemToUpdate.innerHTML = update;
};

let update = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  const nameInput = document.getElementById("updateName");
  const priceInput = document.getElementById("updatePrice");

  if (!nameInput || !priceInput) {
    alert("Enable to find the input fields");
    return;
  }

  let updatedName = nameInput.value;
  let updatedPrice = priceInput.value;

  if (updatedName === "" || updatedPrice === "") {
    alert("Please enter valid details");
    return;
  }

  userData[index] = { productName: updatedName, productPrice: updatedPrice };

  localStorage.setItem("userDetails", JSON.stringify(userData));

  displayData();
  calTotal();
};

let cancelUpdate = () => {
  displayData();
};

let remove = (button, index) => {
  const removeProduct = button.closest(".show");

  const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.splice(index, 1);

  localStorage.setItem("userDetails", JSON.stringify(userData));

  if (removeProduct) {
    removeProduct.remove();
    alert("Item Deleted");
  }
  calTotal();
};

let calTotal = () => {
  let total = 0;
  let showTotal = document.querySelector(".total");
  const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.forEach((elem) => {
    total += parseInt(elem.productPrice);
  });

  showTotal.innerHTML = `<p class="text-2xl">Total :</p> 
  <p class="price text-2xl">${total}</p>`;
};

displayData();
calTotal();
