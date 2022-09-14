// Show products on front end

window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/products").then((productInfo) => {
    if (productInfo.request.status === 200) {
      const products = productInfo.data.products;
      
    //   console.log(products)
      const parent = document.getElementById("products");

      products.forEach((products) => {
        const childHTML = ` <div class="albums">
        
                <h3 class="title">${products.title}</h3>
                <img
                  class="images"
                  src="${products.imageUrl}"
                  alt="${products.title}"
                />
                <div class="price">
                  <h4 class="amount">${products.price}$</h4>
                  <button class="addcart" onclick="addtocart(${products.id})">Add to Cart</button>
                </div>
              </div>`;
        
        parent.innerHTML += childHTML;

      });
    //   cart();
    }
  });
});

function addtocart(productId) {
    axios.post('http://localhost:3000/cart',{productId:productId})
    .then((response)=>{
        if(response.status === 400){
            notifyusers(response.data.message)
        } else {
           throw new Error()
        }
       
    })
    .catch((err)=>{
        notifyusers(err.data.message)
    })
}

function notifyusers(message) {
   alert(`${message}`)
}

// // adding to cart
// // function cart() {
// //   let addcartBtn = document.getElementsByClassName("addcart");

// //   for (let i = 0; i < addcartBtn.length; i++) {
// //     let btn = addcartBtn[i]
// //      btn.addEventListener("click", addToCart);
// //   }

// //   function addToCart(event) {
   

// //     let button = event.target;
// //     let itemTobeAdded = button.parentElement.parentElement;
// //     let title = itemTobeAdded.getElementsByClassName("title")[0].innerText;
// //     let image = itemTobeAdded.getElementsByClassName("images")[0].src;
// //     let price = itemTobeAdded.getElementsByClassName("amount")[0].innerText;
// //     addingItem(title, image, price);
// //   }

// //   function addingItem(title, image, price) {
// //     let cartRow = document.createElement("div");
// //     cartRow.classList = "cart-row";
// //     let cartItems = document.getElementsByClassName("cart-items")[0];
// //     console.log(cartItems);

// //     let content = ` <div class="cart-item cart-column">
// //     <img class="cart-item-image" src=${image} width="100" height="100">
// //     <span class="cart-item-title">${title}</span>
// //     </div>
// //     <span class="cart-price cart-column">${price}</span>
// //     <div class="cart-quantity cart-column">
// //     <input class="cart-quantity-input" type="number" value="1">
// //     <button class="btn btn-danger" type="button">REMOVE</button>
// //     </div>`;

// //     cartRow.innerHTML = content;

// //     if (cartItems.childElement === cartRow) {
// //        alert("Product already exists!!");
// //     } else {
// //       cartItems.append(cartRow);
// //       alert("Product Successfully Added");
// //     }
// //     removeItem();
// //     updateCartTotal();
// //     qtyChanged()
// //   }
// }

// removing item from cart

function removeItem() {
  let removebtn = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removebtn.length; i++) {
    let button = removebtn[i];
    button.addEventListener("click", function (event) {
      let btn = event.target;
      btn.parentElement.parentElement.remove();
      updateCartTotal();
    });
  }
}

function qtyChanged() {
    let qtyval = document.getElementsByClassName("cart-quantity-input")
    for(let i=0;i<qtyval.length;i++){
        let qty = qtyval[i]
        qty.addEventListener('change',quantityChanges)
    }
}
 
function quantityChanges(event) {
    let value = event.target
    if(isNaN(value.value) || value.value<=0) {
        value.value = 1
    }
    updateCartTotal()
}

// updating cart total

function updateCartTotal() {
  let cartItem = document.getElementsByClassName("cart-items")[0];
  let cartRows = document.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 1; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let price = document.getElementsByClassName("cart-price")[i];
    let priceValue = parseFloat(price.innerText.replace("$", ""));
    let quantity = document.getElementsByClassName("cart-quantity-input")[0];
    let qty = quantity.value;
    console.log(price);
    total += priceValue * qty;
  }

  document.getElementsByClassName("cart-total-price")[0].innerText = total;
}

// cart pop-up model

let open = document.getElementsByClassName("seecart");
const close = document.getElementById("close");
const container = document.getElementById("container");

for (let i = 0; i < open.length; i++) {
  let btn = open[i];
  btn.addEventListener("click", showcart);
}

function showcart() {
  container.classList.add("active");
}

close.addEventListener("click", () => {
  container.classList.remove("active");
});
