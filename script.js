// Cart array
let cart = [];


// LOGIN
function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        document.getElementById("loginPage").classList.add("hidden");

        document.getElementById("appPage").classList.remove("hidden");

    } else {

        alert("Invalid Username or Password");

    }
}


// LOGOUT
function logout() {

    cart = [];

    document.getElementById("appPage").classList.add("hidden");

    document.getElementById("loginPage").classList.remove("hidden");

    updateCart();

}


// ADD PRODUCT
function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}


// UPDATE CART
function updateCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let subtotal = 0;


    cart.forEach((item, index) => {

        let total = item.price * item.quantity;

        subtotal += total;


        cartItems.innerHTML += `

            <tr>

                <td>${item.name}</td>

                <td>₹${item.price}</td>

                <td>

                    <button class="qty-btn"
                    onclick="decreaseQuantity(${index})">−</button>

                    ${item.quantity}

                    <button class="qty-btn"
                    onclick="increaseQuantity(${index})">+</button>

                </td>

                <td>₹${total}</td>

                <td>

                    <button class="delete-btn"
                    onclick="removeItem(${index})">
                    Remove
                    </button>

                </td>

            </tr>

        `;

    });


    let discount = subtotal * 0.10;

    let grandTotal = subtotal - discount;


    document.getElementById("subtotal").innerText =
        subtotal.toFixed(2);

    document.getElementById("discount").innerText =
        discount.toFixed(2);

    document.getElementById("grandTotal").innerText =
        grandTotal.toFixed(2);

}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// REMOVE PRODUCT
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// GENERATE BILL
function generateBill() {

    if (cart.length === 0) {

        alert("Please add products to cart!");

        return;
    }


    let customerName =
        document.getElementById("customerName").value;


    if (customerName === "") {

        alert("Please enter customer name!");

        return;
    }


    let subtotal = 0;

    let billItems = document.getElementById("billItems");

    billItems.innerHTML = "";


    cart.forEach(item => {

        let total = item.price * item.quantity;

        subtotal += total;


        billItems.innerHTML += `

            <p>
                ${item.name} -
                ${item.quantity} × ₹${item.price}
                = ₹${total}
            </p>

        `;

    });


    let discount = subtotal * 0.10;

    let grandTotal = subtotal - discount;


    document.getElementById("billCustomer").innerText =
        customerName;

    document.getElementById("billDate").innerText =
        new Date().toLocaleString();

    document.getElementById("billTotal").innerText =
        grandTotal.toFixed(2);


    document.getElementById("receipt")
        .classList.remove("hidden");


    document.getElementById("receipt")
        .scrollIntoView({
            behavior: "smooth"
        });

}