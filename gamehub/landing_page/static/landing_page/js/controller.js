
document.body.addEventListener('click', function(event) {
    const target = event.target;

    if(target.dataset.toggle == 'modal'){
        console.log(document.getElementById(target.dataset.target).classList.toggle('d-none'))
    }

    if(target.dataset.option === 'chinese'){
        console.log('chinese')
    }
    if(target.dataset.option === 'x0'){
        console.log('x0')
    }
    if(target.dataset.option === 'letters'){
        console.log('letters');

        fetch('/words/api/categories-difficulties/')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('category');
            const difficultySelect = document.getElementById('difficulty');

            categorySelect.innerHTML = '';
            difficultySelect.innerHTML = '';

            data.categories.forEach(category => {
                let option = new Option(category.name, category.id);
                categorySelect.add(option);
            });

            data.difficulties.forEach(difficulty => {
                let option = new Option(difficulty, difficulty);
                difficultySelect.add(option);
            });
        })
        .catch(error => console.error('Error loading the data:', error));
    }

});



function confirmSelection() {
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch('/api/handle_game_selection/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ category: category, difficulty: difficulty })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirigir a la URL proporcionada por el servidor
            window.location.href = data.redirect_url;
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    })
    .catch(error => console.error('Error:', error));
}


