import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { auth, db } from "./firebase-configuration.js";

const productcollection = collection(db, "product");
const productForm = document.getElementById("ProductForm");
productForm.addEventListener("submit", addProduct);

async function addProduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        const productPrice = e.target.productPrice.value
        const user = JSON.parse(localStorage.getItem("Users"));
        const productObj = {
            name: productName,
            desc: productDesc,
            price: productPrice,
            userUid: user.uid,
        }

        console.log(productObj, "add",)
        await addDoc(productcollection, productObj);
        alert("Your Product Is Added Successfully");
    } catch (error) {
        alert(error.message, "error Agaya Hai")
    }
}
window.addProduct = addProduct;