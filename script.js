let addcartBtn = document.getElementsByClassName('addcart')
for(let i=0;i<addcartBtn.length;i++) {
    let btn = addcartBtn[i]
    btn.addEventListener('click',addToCart)
}

function addingItem(title,image,price) {
    let cartRow = document.createElement('div')
    cartRow.classList='cart-row'
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let content =  ` <div class="cart-item cart-column">
    <img class="cart-item-image" src=${image} width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">cd
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
cartRow.innerHTML = content
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn btn-danger')[0].addEventListener('click',removeCartItem);
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

updateCartTotal()
alert('Product Successfully Added')

}

function updateCartTotal() {
  let cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItems.querySelectorAll(".cart-row2");
  // console.log(cartRows)
  let total = 0;
  for (
    let i = 0;
    i < cartRows.length;
    i++
  ) {
    total +=
      Number(
        cartRows[i].querySelector(".cart-price").innerText
      ) *
      Number(
        cartRows[i].querySelector(".cart-quantity-input").value
      );
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
  // console.log(document.getElementsByClassName("cart-total-price")[0].innerText);
}

function qtyChanged() {
  let qtyval = document.getElementsByClassName("cart-quantity-input");
  
  // console.log(qtyval)
  for (let i = 0; i < qtyval.length; i++) {
    let qty = qtyval[i];
    qty.addEventListener("change", quantityChanges);
  }
}
function quantityChanges(event) {
  let value = event.target;
  if (isNaN(value.value) || value.value <= 0) {
    value.value = 1;
  }
  updateCartTotal();
}

// Remove item from cart
const removeCartItemButtons=document.getElementsByClassName('btn btn-danger');
//console.log(removeCartitembuttons);
for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i]
     button.addEventListener('click', removeCartItem)
 } 
 function removeCartItem(event) {
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


let open = document.getElementsByClassName("seecart");
const close = document.getElementById("close");
const container = document.getElementById("container");

for(let i=0;i<open.length;i++) {
    let btn=open[i]
    btn.addEventListener("click", showcart)

}

function showcart() {
    container.classList.add("active");
}

close.addEventListener("click", () => {
    container.classList.remove("active");
});

function addtocart(productId) {
  let albums = document.querySelectorAll('.albums')
  axios
  .post("http://localhost:3000/cart", { productId: productId })
  .then((response) => {
    
    if (response.status === 200) {
     getCartDetails();
      notifyusers(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  })
  .catch((err) => {
    notifyusers(err);
    
  });
}
function notifyusers(message) {
   alert(`${message}`)
}
function getCartDetails() {

  axios
    .get("http://localhost:3000/cart")
    .then((data) => {
      if (data.status === 200) {
        let products = data.data.products;
        
        let cartItems = document.getElementsByClassName("cart-items")[0];
        cartItems.innerHTML = ''
        // console.log(cartItems)
        products.forEach((product) => {
          let cartRow = document.createElement("div");
           cartRow.className = "cart-row2";
           
          let content = ` <div class="cart-item cart-column">
               <div class="divider">
               <img class="cart-item-image" src=${product.imageUrl} width="100" height="100">
               
               <span class="cart-item-title">${product.title}</span>
               </div>
               <span class="cart-price cart-column">${product.price}</span>
               <div class="cart-quantity cart-column">
               <input class="cart-quantity-input" type="number" value="${product.cartItem.quantity}" change="addtocart${product.id}">
              
               <button class="btn btn-danger" type="button" onclick="removeItem(${product.id})">REMOVE</button>
               </div>
               </div>`;

          cartRow.innerHTML = content;
          cartItems.append(cartRow);
        });     
        updateCartTotal();
        qtyChanged()
        
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      notifyusers(err);
    });
}
 
function removeItem(productId) {
 
 axios.delete(`http://localhost:3000/cart-delete-item/${productId}`)
 .then(response=>{
 getCartDetails()
  updateCartTotal()
 })
} 

let c = 0;
let cc = 1;
let pag = document.getElementById('pagination');
// Show products on front end
window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/limited?page=0").then((productInfo) => {
    if (productInfo.request.status === 200) {
      console.log(productInfo)
      let products = productInfo.data.products;
      console.log(products)
      let childHTML = "";
      let parent = document.getElementById("products");
       console.log(products,parent)
      products.forEach((product) => {
         childHTML += ` <div class="albums">
                <input type="hidden" id="hidden" value="${product.id}">
                <h3 class="title">${product.title}</h3>
                <img
                  class="images"
                  src="${product.imageUrl}"
                  alt="${product.title}"
                />
                <div class="price">
                  <h4 class="amount">${product.price}$</h4>
                  <button class="addcart" onclick="addtocart(${product.id})">Add to Cart</button>
                  
                </div>
              </div>`;
        });
        parent.innerHTML = childHTML;
    }
  });
  getCartDetails();
  pagination()
});

function pagination(e) {
  axios.get("http://localhost:3000/products")
  .then((productInfo)=>{
    let number_of_pages;
    if(productInfo.data.products.length % 2 == 0) {
       number_of_pages = Math.trunc(((productInfo.data.products.length)/2))
    } else {
       number_of_pages = Math.trunc(((productInfo.data.products.length)/2)+1)
    }
   
    for (let i = 0; i < number_of_pages-1; i++) {
      pag.innerHTML += `<button class="pagebtn" id="?page=${c++}">${cc++}</button> `;
    }
  })
  .catch(err=>console.log(err))
}
pag.addEventListener('click', (e)=>{
  let id = e.target.id;
  console.log(id)
  axios.get(`http://localhost:3000/limited${id}`)
  .then(productInfo=>{
    let products = productInfo.data.products;
     let childHTML="";
      let parent = document.getElementById("products");
      // console.log(products,parent)
      products.forEach((product) => {
         childHTML += ` <div class="albums">
                <input type="hidden" id="hidden" value="${product.id}">
                <h3 class="title">${product.title}</h3>
                <img
                  class="images"
                  src="${product.imageUrl}"
                  alt="${product.title}"
                />
                <div class="price">
                  <h4 class="amount">${product.price}$</h4>
                  <button class="addcart" onclick="addtocart(${product.id})">Add to Cart</button>
                  
                </div>
              </div>`;
        
      });
      parent.innerHTML = childHTML;
  })
  .catch(err=>console.log(err))
})
let purchasebtn =  document.getElementById('purchasebtn')

purchasebtn.addEventListener('click',()=>{
axios.post('http://localhost:3000/Order',{cartId:1})
.then(response=>{
  console.log(response);
  let orderId=response.data.orders.id;
  alert(`Your Order has been successfully placed with order Id ${orderId}, Thanks for Shopping`)
  getCartDetails();
  updateCartTotal()
})
})