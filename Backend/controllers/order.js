const Cart = require("../models/cart");
const Product = require("../models/product");
const CartItem = require("../models/cart-item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const user = require("../models/user");


exports.createOrder =(req,res,next)=>{
    let orders
    let fetchedCart
    req.user.getCart().then(cart=>{
      fetchedCart=cart
      return cart.getProducts();
    })
    .then(products =>{
     return req.user.createOrder()
     .then(order=>{
      orders=order;
      return order.addProducts(products.map(product=>{
         product.orderItem= {quantity:product.cartItem.quantity}       
         return product;
       }))    
     })   
    })
    .then(result=>{   
      fetchedCart.setProducts(null)
      res.status(200).json({orders:orders})
      
    })
}


 exports.showOrder = (req,res,next)=>{
    req.user.getOrders({include:['products']})
    .then(orders=>{
      res.status(200).json(orders)
    }).catch(err=>{
      console.log(err);
    })
    
  };