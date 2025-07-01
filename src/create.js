const userData = JSON.parse(sessionStorage.getItem('userData'));

if (!userData) {
    location = '/login.html';
}

document.querySelector('form').addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const recipe = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n'),
        steps: formData.get('steps').split('\n'),
    }

    try {
        if (!recipe.name || !recipe.img || !recipe.ingredients.length || !recipe.steps.length) {
            throw new Error('All fields are required');
        }

        const url = 'http://localhost:3030/data/recipes';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.accessToken
            },
            body: JSON.stringify(recipe)
        };

        const res = await fetch(url, options);

        if (!res.ok) {
            const err = await res.json();
            throw err;
        }

        location = '/';
    } catch (error) {
        alert(error.message);
    }
}