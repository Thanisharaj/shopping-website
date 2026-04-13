let products = [
  { name: "T-Shirt", price: 500 },
  { name: "Shoes", price: 1200 },
  { name: "Watch", price: 1500 },
  { name: "Bag", price: 800 },
  { name: "Headphones", price: 2000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach((p, index) => {
    container.innerHTML += `
      <div class="card">
        <img src="https://via.placeholder.com/150">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${index})">Add</button>
      </div>
    `;
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

function updateCartCount() {
  document.getElementById("count").innerText = cart.length;
}

function openCart() {
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price;
    list.innerHTML += `
      <li>
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${i})">X</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cart").style.display = "block";
}

function closeCart() {
  document.getElementById("cart").style.display = "none";
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
  updateCartCount();
}

function searchProduct() {
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
}

// Initial load
displayProducts(products);
updateCartCount();
