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
  }

  elem.target.product.value = " ";
  elem.target.price.value = " ";
  window.location.reload();
  elem.preventDefault();
});

let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = ``;

  userData.forEach((elem, i) => {
    finalData += `<div class="show bg-sky-800 rounded p-4 mb-2 flex justify-around">
      <p class="p-2 text-2xl w-1/4 flex justify-start">${elem.productName}</p>
      <p class="p-2 text-2xl w-1/4 flex justify-start">${elem.productPrice}</p>
      <button onclick="remove(this , ${i})"><i class="fa-solid fa-trash-can text-xl"></i></button>
      </div>`;
  });

  show.innerHTML = finalData;
};

let remove = (button, index) => {
  const removeProduct = button.closest(".show");

  const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.splice(index , 1);

  localStorage.setItem("userDetails", JSON.stringify(userData));

  if (removeProduct) {
    removeProduct.remove();
    alert("Item Deleted");
  }
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
