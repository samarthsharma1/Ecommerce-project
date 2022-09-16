
 let parent = document.getElementById("orderItems");
 window.addEventListener("DOMContentLoaded", () => {
    getOrders()
 })
 function getOrders(){
   axios
       .get("http://localhost:3000/Order")
   .then(data=>{
     console.log(data);
     const orders=data.data;
     var totalprice=0;
     for(let i=0;i<orders.length;i++){
       const orderitesm=` <div class="orders-cart">
       <div class="order-header">
         <h3>order id:${orders[i].id}</h3>
        
         <p hidden>${totalprice = 0}</p>
       </div>
       
       <div class="card-item-cont">
       ${
           
           orders[i].products.map(product=>
              ` <div class="card-item">
               <img
                 class="order-img"
                 src=${product.imageUrl}
                 alt=""
               />
               <div class="card-item-desc" >
                 <h4>${product.title}</h4>
                 <h4>$ ${product.price}</h4>
                 <h4>qty:${product.orderItem.quantity}</h4>
                 <h4>${product.description}</h4>
                 <p hidden>${totalprice+=parseFloat(product.price)*parseInt(product.orderItem.quantity)}</p>
               </div>   
             </div>`
       )}
        
       </div>
       <h4 class='totalPrice'> Total:$ ${totalprice}</h4>
   
     </div>`
     parent.innerHTML=  parent.innerHTML+orderitesm
 
   }
 
 })
 }
   