function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if(pageId === 'cartPage') loadCart();
  window.scrollTo(0,0);
}

// Products data - Full Collection
const products = {
  mens: [
    {id: 1, name: "White Formal Shirt", price: 899, img: "whiteshirt.jpg"},
    {id: 2, name: "Blue Check Shirt", price: 799, img: "blue.webp"},
    {id: 3, name: "Black Slim Fit Shirt", price: 999, img: "blackshirt.avif"},
    {id: 4, name: "Casual Linen Shirt", price: 849, img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400"},
    {id: 5, name: "Grey Office Shirt", price: 899, img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400"},
    {id: 6, name: "Striped Shirt", price: 749, img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400"},
    {id: 7, name: "Denim Jeans", price: 1299, img: "denium.webp"},
    {id: 8, name: "Black Jeans", price: 1199, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"}
  ],
  womens: [
    {id: 9, name: "Cotton Saree", price: 2499, img: "sarees.jpeg"},
    {id: 10, name: "Western Dress", price: 1199, img: "western.jpeg"},
    {id: 11, name: "Kurti Set", price: 999, img: "kurta.jpeg"},
    {id: 12, name: "Anarkali Suit", price: 1799, img: "anarkali.jpeg"},
    {id: 13, name: "Leggings", price: 499, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
    {id: 14, name: "Summer Top", price: 699, img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400"}
  ],
  kids: [
    {id: 15, name: "Girls Frock", price: 699, img: "kids wear.jpg"},
    {id: 16, name: "Boys T-shirt", price: 499, img: "boytshirt.jpg"},
    {id: 17, name: "Kids Jeans", price: 799, img: "kidsjeans.jpg"},
    {id: 18, name: "Baby Frock", price: 599, img: "frock.jpeg"},
    {id: 19, name: "Kids Hoodie", price: 899, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"}
  ]
};

let cart = [];

function showCategory(type) {
  showPage('categoryPage');
  document.getElementById('categoryTitle').innerText = type.charAt(0).toUpperCase() + type.slice(1) + " Collection";
  const container = document.getElementById('categoryProducts');
  container.innerHTML = "";
  products[type].forEach(item => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${item.img}" class="product-img">
        <h3>${item.name}</h3>
        <p><b>₹${item.price}</b></p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}
function addToCart(id) {
  let product = [...products.mens,...products.womens,...products.kids].find(p => p.id === id);
  let cartItem = cart.find(c => c.id === id);
  if(cartItem) {
    cartItem.qty++; 
  } else {
    cart.push({...product, qty: 1}); 
  }
  
  showPage('cartPage'); 
  loadCart(); 
}
function loadCart() {
  const cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" width="60">
        <p>${item.name} x ${item.qty} = ₹${item.price * item.qty}</p>
      </div>
    `;
  });
  document.getElementById('subtotal').innerText = subtotal;
  document.getElementById('discount').innerText = Math.round(subtotal * 0.1);
  document.getElementById('total').innerText = subtotal - Math.round(subtotal * 0.1);
}