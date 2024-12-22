let form = document.querySelector("form");
let show = document.getElementById("list");

form.addEventListener("submit", (elem) => {
  let productName = elem.target.product.value;
  let productPrice = elem.target.price.value;

  if (productName == "" && productPrice == "") {
    alert("PLease Enter the product name or price");
    return;
  }

  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.push({
    productName: productName,
    productPrice: productPrice,
  });

  localStorage.setItem("userDetails", JSON.stringify(userData));

  elem.target.product.value = " ";
  elem.target.price.value = " ";
  window.location.reload();
  elem.preventDefault();
});

let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = ``;

  userData.forEach((elem, i) => {
    finalData += `<div class="show bg-blue-600 rounded p-4 mb-2 flex justify-around">
      <p class="p-2 text-xl w-1/4 flex justify-center">${elem.productName}</p>
      <p class="p-2 text-xl w-1/4 flex justify-start">${elem.productPrice}</p>
      <button onclick="remove(this , ${i})"><i class="fa-solid fa-trash-can"></i></button>
      </div>`;
  });

  show.innerHTML = finalData;
};

let remove = (button, index) => {
  const removeProduct = button.closest(".show");

  const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

  userData.splice(index);

  localStorage.setItem("userDetails", JSON.stringify(userData));

  if (removeProduct) {
    removeProduct.remove();
    alert("Item Deleted");
  }
};

displayData();
