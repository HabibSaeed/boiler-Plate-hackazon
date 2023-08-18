import { db } from "./firebase-configuration.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const cardContainer = document.querySelector("#card-container");
const logoutBtn = document.querySelector("#logoutBtn");

window.addEventListener("load", async () => {
    try {
        const loginUser = JSON.parse(localStorage.getItem("Users"));

        if (localStorage.getItem("Users") === null) {
            window.location.replace("/");
            return;
        } else {
            if (loginUser.type !== "admin") {
                history.back();
                return;
            }
        }

        const docsRef = collection(db, "users");
        const querySnapshot = await getDocs(docsRef);

        querySnapshot.forEach((docSnapshot) => {
            const user = docSnapshot.data();
            if (user.type !== "admin") {
                const cardUI = `
                    <div class="card mx-4 mt-3 col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${user.fullName}</h5>
                            <p class="card-text">${user.email}</p>
                            <p class="card-text">${user.type}</p>
                            <div class="form-check form-switch">
                                <input class="form-check-input" id="${user.uid}" type="checkbox" ${user.accountActivate ? "checked" : ""
                    } onchange="handleAccountActivation(this)">
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.innerHTML += cardUI;
            }
        });
    } catch (error) {
        console.error("Error:", error);
    }
});

const getUser = () => {
    console.log(getUser());
}


const handleAccountActivation = async (e) => {
    console.log("handleAccountActivation", e.checked)
    console.log("handleAccountActivation", e.id)

    try {
        const userRef = doc(db, "users", e.id);
        await updateDoc(userRef, {
            accountActivate: e.checked
        })

    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user")
    window.location.replace("/")
})

window.handleAccountActivation = handleAccountActivation;