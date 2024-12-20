// const ul = document.querySelector("ul")
// const input = document.getElementById("item")


// let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : { } ;


// function add(){
//     itemsArray.push({

//     })
//     localStorage.setItem("items" , JSON.stringify(itemsArray))
//     addTask(input.value)
//     input.value = " "
// }

// function remove(){
//     localStorage.clear()
//     ul.innerHTML = ""
//     itemsArray = []
// }
// function addTask(text){
//     const li = document.createElement("li")
//     li.textContent = text
//     ul.appendChild(li)
// }

// itemsArray.forEach(addTask)


let form = document.querySelector("form")
let show = document.getElementById("list")

form.addEventListener("submit", (elem) => {
    let productName = elem.target.product.value
    let productPrice = elem.target.price.value

    let userData = JSON.parse(localStorage.getItem("userDetails")) ?? []

    userData.push({
        "productName": productName,
        "productPrice": productPrice
    })

    console.log(userData)
    localStorage.setItem("userDetails", JSON.stringify(userData))
    elem.target.product.value = " ";
    elem.target.price.value = " ";
    window.location.reload();
    elem.preventDefault()

})


let displayData = () => {

    let userData = JSON.parse(localStorage.getItem("userDetails")) ?? []
    let finalData = ``

    userData.forEach((elem, i) => {
        finalData += `<div class="bg-blue-500 rounded p-4 mb-4">
                <p class="p-2 text-xl">${elem.productName}</p>
                <p class="p-2 text-xl">${elem.productPrice}</p>
            </div>`
    });

    show.innerHTML = finalData
    // console.log(finalData)
}

displayData()