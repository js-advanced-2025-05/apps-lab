import { updateNav } from "./utils.js";
import { showCatalogView } from "./catalog.js";
import { getUserData } from "./utils.js";

const loguotBtn = document.getElementById("logoutBtn");
loguotBtn.addEventListener("click", logout);

export async function logout() {
    const userData = getUserData();
    
    const url = "http://localhost:3030/users/logout";

    const options = {
        method: "GET",
        headers: {"X-Authorization": userData.accessToken}
    }

    await fetch(url, options);
    sessionStorage.clear();

    updateNav();
    showCatalogView();

}