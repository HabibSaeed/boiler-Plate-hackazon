import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { db, auth } from "./firebase-configuration.js";

const signUpBtn = document.querySelector("#signUpBtn");
signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const fullName = document.querySelector("#fullName").value
        const phoneNumber = document.querySelector("#phoneNumber").value
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value
        const userType = document.querySelector("#userType")

        if (!fullName || !phoneNumber || !email || !password) {
            alert("Please Enter All Required Feilds");
            return
        }

        if (userType.selectedIndex === 0) {
            alert("Please Select Your User Type");
            return
        }

        const userAuth = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userAuth.user.uid;
        const userObj = {
            fullName,
            phoneNumber,
            email,
            uid,
            type: userType.value,
            accountActivate: true,

        };

        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj);
        window.location.assign("/");

    } catch (error) {
        alert("Error Aya Hai ", error.message)
        console.log(error)
    }
})