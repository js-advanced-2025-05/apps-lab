const userData = JSON.parse(sessionStorage.getItem("userData"));

if (userData) {
  document.getElementById("user").style.display = "inline-block";
} else {
  document.getElementById("guest").style.display = "inline-block";
}

const logoutBtn = document
  .getElementById("logoutBtn")
  .addEventListener("click", onLogOut);

function onLogOut() {
  sessionStorage.removeItem("userData");
  location = "/";
}

loadRecipes();

async function loadRecipes() {
  const url = "http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg";

  const res = await fetch(url);
  const data = await res.json();

  showRecipes(data);
}

function showRecipes(recipes) {
  const main = document.querySelector("main");
  main.replaceChildren();

  for (let recipe of recipes) {
    const element = createRecipePreview(recipe);
    main.appendChild(element);
  }
}

function createRecipePreview(record) {
  const element = document.createElement("article");
  element.className = "preview";

  element.innerHTML = `
    <div class="title">
        <h2>${record.name}</h2>
    </div>
    <div class="small">
        <img src="${record.img}">
    </div>`;

  element.addEventListener("click", onClick);

  return element;

  async function onClick() {
    element.removeEventListener("click", onClick);

    const url = "http://localhost:3030/data/recipes/" + record._id;

    const res = await fetch(url);
    const data = await res.json();

    element.innerHTML = `
    <h2>${data.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${data.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${data.ingredients.map((i) => `<li>${i}</li>`).join("")}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${data.steps.map((s) => `<p>${s}</p>`).join("")}
    </div>`;
  }
}

/*
<article class="preview">
    <div class="title">
        <h2>Title</h2>
    </div>
    <div class="small">
        <img src="assets/lasagna.jpg">
    </div>
</article>
*/

/*
<article>
    <h2>Title</h2>
    <div class="band">
        <div class="thumb">
            <img src="assets/lasagna.jpg">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
                <li>Ingredient 4</li>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quaerat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officia ipsam nulla vitae nobis
            reprehenderit pariatur aut dolor exercitationem impedit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem odit officiis numquam
            corrupti? Quam.</p>
    </div>
</article>
*/
