const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json({products , success:true})
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.limitProducts = (req, res, next) => {
let page = Number(req.query.page);
let Limit = 3;

  Product.findAll({limit:3,offset:Limit*page})
    .then(products => {
      res.json({products , success:true})
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  
  const prodId = req.params.productId;
  Product.findAll({where:{id:prodId}})
  .then(product=>{
    
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
   
  })
  .catch(err=>{
    console.log(err);
  })
};
 
exports.getIndex = (req, res, next) => {
  Product.findAll().then(products=>{
   // console.log(products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  })
 
}
  




exports.getCart = (req, res, next) => {
  req.user
  .getCart()
  .then(cart => {
    return cart
.getProducts()
.then(products=>{
  res.status(200).json({
    succes:true,
    products:products
  })
  //res.render('shop/cart', {
           // path: '/cart',
            //pageTitle: 'Your Cart',
            //products: products
           });
})
  .catch(err => console.log(err));
//})
//.catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({success:true,message:'Shirt Sucessfully added to cart'});
    })
    .catch(err => {
      res.status(500).json({success:false,message:'error occured'})
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      
      const product = products[0];
      return product.cartItem.destroy();
    })
  //  .then(result => {
      ////res.json('deleted');
      //res.redirect('/cart');
  //  })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });

};

exports.addproducts=(req,res,next)=>{
  let {title,price,imageUrl,description}=req.body;
  let userid=req.user.id;
  Product.create({title:title,price:price,imageUrl:imageUrl,description:description,userId:userid})
  .then(result=>{
    res.json(result)
  })
  .catch(err=>{
    res.json(err);
  })
}  