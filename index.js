/////////////////////////////Function to click on menu categories and show the items////////////////////////////////////
let hot_drinks_get = document.getElementById("hot_drinks_get");
let hot_drinks = document.getElementById("hot_drinks");

hot_drinks_get.addEventListener("click", function () {
  if (hot_drinks.style.display === "none") {
    hot_drinks.style.display = "block";
    fresh_drinks.style.display = "none";
    sandwichs.style.display = "none";
    pastries.style.display = "none";
  } else {
    hot_drinks.style.display = "none";
  }
})

let fresh_drinks_get = document.getElementById("fresh_drinks_get");
let fresh_drinks = document.getElementById("fresh_drinks");

fresh_drinks_get.addEventListener("click", function () {
  if (fresh_drinks.style.display === "none") {
    hot_drinks.style.display = "none";
    fresh_drinks.style.display = "block";
    sandwichs.style.display = "none";
    pastries.style.display = "none";
  } else {
    fresh_drinks.style.display = "none";
  }
})

let sandwichs_get = document.getElementById("sandwichs_get");
let sandwichs = document.getElementById("sandwichs");

sandwichs_get.addEventListener("click", function () {
  if (sandwichs.style.display === "none") {
    hot_drinks.style.display = "none";
    fresh_drinks.style.display = "none";
    sandwichs.style.display = "block";
    pastries.style.display = "none";
  } else {
    sandwichs.style.display = "none";
  }
})

let pastries_get = document.getElementById("pastries_get");
let pastries = document.getElementById("pastries");

pastries_get.addEventListener("click", function () {
  if (pastries.style.display === "none") {
    hot_drinks.style.display = "none";
    fresh_drinks.style.display = "none";
    sandwichs.style.display = "none";
    pastries.style.display = "block";
  } else {
    pastries.style.display = "none";
  }
})
/////////////////////////////Function to click on cart and show the client "bag"////////////////////////////////////
let cartIcon = document.getElementById("cart");
let cart_show = document.getElementById("cart-show");
function openCart(action) {
  cart_show.style.display = action;
  if (cart_show.style.display === "block") {
    document.body.style.width = "78%";
  }
}
cartIcon.addEventListener("click", function () {
  openCart("block");
});
////////////////////////////CLOSE THE CONTENT WHEN CLICK ON X ////////////////////////////////////////////
let closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", function () {
  if (cart_show.style.display === "block") {
    cart_show.style.display = "none";
    document.body.style.width = "100%";
  }
});
///////////////////////////////////Declare the global variables///////////////////////////////
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

let cartshow = document.querySelector("#cart-show")

let cart = cartshow.querySelector('.items');

let addToCartButtons = document.querySelectorAll('.add-item-cart');

///////////////////////////////////Add the item to the cart///////////////////////////////
addToCartButtons.forEach(button => {
  button.addEventListener('click', function addToCart(event) {
    openCart('block');
    let botao = event.target;
    let id = botao.getAttribute('data-id');
    let Name = botao.getAttribute('data-name');
    let price = botao.getAttribute('data-price');
    let quantity = 1;
    if (cartItems.hasOwnProperty(id)) {
      cartItems[id].quantity++;
      cartItems[id].price += price * quantity;
    }
    else {
      cartItems[id] = {
        name: Name,
        quantity: quantity,
        price: price * quantity
      };
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    Subtotal();
  });
});
////////////////////Get the string(Object) inside of local storage and display in my cart//////////////////////////
function showCart() {
  cart.innerHTML = '';
  for (const id in cartItems) {
    let cartItem = document.createElement('ul');
    cartItem.dataset.id = id;
    cartItem.innerHTML = `
      <button class="plus"><i class="fa-solid fa-plus"></i></button>
      <span class="qtt">${cartItems[id].quantity}</span> 
      <button class="minus"><i class="fa-solid fa-minus"></i></button> 
      | ${cartItems[id].name} | 
      $<span class="price">${cartItems[id].price.toFixed(2)}</span>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    `;
    ///////////////////////FUNCTION TO ADD ONE ITEM FROM THE QUANTITY/////////////////
    cartItem.querySelector('.plus').addEventListener('click', () => {
      // Increment ++ in quantity and update the price
      cartItems[id].quantity++;
      cartItems[id].price += cartItems[id].price / (cartItems[id].quantity - 1);
      // Update the element ul that I created in my cart
      let itemQtt = cartItem.querySelector('.qtt');
      itemQtt.innerHTML = `<span class="qtt">${cartItems[id].quantity}</span>`
      let itemPrice = cartItem.querySelector('.price');
      itemPrice.innerHTML = `<span class="price">${cartItems[id].price.toFixed(2)}</span>`

      // save the new quantity and price in my local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      Subtotal();
    });
    //////////////////////////FUNCTION TO SUBTRACT ONE ITEM FROM THE QUANTITY/////////////////
    cartItem.querySelector('.minus').addEventListener('click', () => {
      cartItems[id].quantity--;
      cartItems[id].price -= cartItems[id].price / (cartItems[id].quantity + 1);

      if (cartItems[id].quantity === 0) {
        delete cartItems[id];
        cartItem.remove();
        Subtotal();
      }

      let itemQtt = cartItem.querySelector('.qtt');
      itemQtt.innerHTML = `<span class="qtt">${cartItems[id].quantity}</span>`

      let itemPrice = cartItem.querySelector('.price');
      itemPrice.innerHTML = `<span class="price">${cartItems[id].price.toFixed(2)}</span>`

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      Subtotal();
    });
    //////////////////////////FUNCTION TO REMOVE THE ITEM///////////////////////////////////
    cartItem.querySelector('.delete').addEventListener('click', () => {
      delete cartItems[id];
      cartItem.remove();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      Subtotal();
    });
    ///////////// "Send" the content for the variable cart that receive one div(class = items) inside my cart
    cart.appendChild(cartItem);
  }
}
///////////////////////// Show the cart when the page loads ////////////////////////////////
showCart();
//////////////////////// Update the cart when an item is added //////////////////////////
addToCartButtons.forEach(button => {
  button.addEventListener('click', showCart);
});
/////////////////////// Update the subtotal /////////////////////////
function Subtotal(){
  let total = 0;
  for (const id in cartItems){
    total += cartItems[id].price;
  }
  let subtotal = document.querySelector('.cart-subtotal');
  subtotal.innerHTML = `<span class="cart-subtotal"> ${total.toFixed(2)} </span>`
}
Subtotal();


