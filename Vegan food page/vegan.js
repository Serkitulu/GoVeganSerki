let carts = document.querySelectorAll('.add-cart');
console.log(carts)
 let products = [
    {
        name:'Banana Bites',
        tag:"banana bites",
        price: 7,
        inCart: 0
    },
    { 
        name:'Cheddar cheese',
        tag: "cheddar cheese",
        price: 5,
        inCart: 0 
    },
    { 
        name:'Vegan Meatballs',
        tag: "meatballs",
        price: 10,
        inCart: 0 
    },
    { 
        name:'Crunchy Cookies',
        tag: "crunchy cookies",
        price: 6,
        inCart: 0 
    },
    { 
        name:'Honey-Almond Cereal',
        tag:"honey almond cereal",
        price: 4,
        inCart: 0 
    },
    { 
        name:'Organic Rice',
        tag:"organic rice",
        price: 6,
        inCart: 0 
    },
    { 
        name:'Garbazo Beans',
        tag:"garbazo beans",
        price: 5,
        inCart: 0 
    },
    { 
        name:'Spinach Tortellina',
        tag:"Spinach tortellina",
        price: 8,
        inCart: 0 
    },
    { 
        name:'Oats',
        tag:"old fashined oats",
        price: 7,
        inCart: 0  
    },
    { 
        name:'Sour Cream',
        tag:"sour cream",
        price: 8,
        inCart: 0  
    },
    { 
        name:'Vegan Ranch',
        tag:"vegan ranch",
        price: 8,
        inCart: 0  
    },
    { 
        name:'Vegan Pizza',
        tag:"dairy-free pizza",
        price: 7,
        inCart: 0 
    }
        
 ];


// this is event listner for add to cart button
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
     //console.log(carts[i])
      cartNumbers(products[i]);  
      totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
     //console.log(productNumbers);
    // console.log(typeof productNumbers);
    // converting from string to number in line13
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
 }
 function setItems(product) {
    //  console.log("Inside of SetItems finction");
    //  console.log("My product is", product);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //console.log("My CartItems are", cartItems);
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
           cartItems = {
               ...cartItems,
               [product.tag]: product
           }
        }
        cartItems[product.tag].inCart += 1;
    } else {
     product.inCart = 1;
     //when creating the following objects into local storage the value is saved
     //object (javascript) but it should be as jason object
     cartItems = {
         [product.tag]: product
     }
    }
     localStorage.setItem("productsInCart", JSON.stringify (cartItems));
 }
 function totalCost(product) {
     //console.log("The product price is", product.price);
     let cartCost = localStorage.getItem('totalCost');
     //console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);
     if(cartCost != null) {
         cartCost = parseInt(cartCost);
         localStorage.setItem("totalCost", cartCost + product.price);
      } else {
            localStorage.setItem("totalCost", product.price);
         }
     }
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector
    (".products"); 
    let cartCost = localStorage.getItem('totalCost');
    //console.log(cartItems);
    if( cartItems && productContainer ) {
        //console.log("running") to check your cart page is running
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="/Vegan food page/${item.tag}.jpg">
            <span>${item.name}</span> 
        </div>
        <div class="price">$${item.price}.00</div>
        <div class="quantity">
            <ion-icon class="decrease"
            name="add-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase"
            name="remove-circle-outline"></ion-icon>   
        </div>
        <div class="total">
        $${item.inCart * item.price}.00
        </div>
       `;
    });
    productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle"> 
         Item(s) In Cart
        </h4>
        <h4 class="TotalItemsInCart">
            $${(cartCost)}.00
        </h4>
    `;
        
    }
}
 onLoadCartNumbers(); 
 displayCart();