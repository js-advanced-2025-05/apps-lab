import { updateNav } from './utils.js';
import { showCatalogView } from './catalog.js';

document.getElementById("logoutBtn").addEventListener("click", logOut); // Handles the logout button.

// On click, sends a logout request, clears user data, updates nav, and shows the catalog.

async function logOut() {
    const userData = JSON.parse(sessionStorage.getItem("userData")); 
    if (!userData) {
        updateNav();
        showCatalogView();
        return;
    }

    const url = "http://localhost:3030/users/logout";

    try {
        const options = {
            method: "GET",
            headers: { "X-Authorization": userData.accessToken },
        };

        const res = await fetch(url, options);

        if (res.status !== 204) {
            throw new Error("Logout failed!");
        }

        sessionStorage.removeItem("userData");
        updateNav();
        showCatalogView();

    } catch (error) {
        alert("Error logging out: " + error.message);
        console.error(error);
    }
}