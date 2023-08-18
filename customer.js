import { onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { db } from "./firebase-configuration.js";

const productContainer = document.getElementById("productContainer");
window.addEventListener("load", getProducts);

async function getProducts() {
    const product = onSnapshot(collection(db, "product"), (snapshot) => {
        snapshot.forEach((data) => {
            const myProducts = data.data();
            console.log(myProducts)
            const customerUI = `
            <div class="card mx-4 mt-3 col-md-4">
                <div class="card-body">
                    <h5 class="card-title">${myProducts.name}</h5>
                    <p class="card-text">${myProducts.desc}</p>
                    <p class="card-text">${myProducts.price}</p>
                </div>
            </div>
        `;
            productContainer.innerHTML += customerUI;
        })
    })
}