const elementAjoute = document.querySelector('.add');
const activities = document.querySelector('.todos');
const elementRecherche = document.querySelector('.search input');
elementAjoute.addEventListener('submit', (sub) => {
    sub.preventDefault();

    const newelement = elementAjoute.add.value.trim();

    if (newelement.length != 0) {
        const newTaskHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${newelement}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        activities.innerHTML += newTaskHTML;
        elementAjoute.reset();
    }
});

activities.addEventListener('click', (sub) => {
    if (sub.target.classList.contains('delete')) {
        sub.target.parentElement.remove();
    }
});
ajouter = document.querySelector(".search");
ajouter.addEventListener('submit', (e)=> { 
    e.preventDefault()
        }
);
elementRecherche.addEventListener('input', () => {
    const motRecherche = elementRecherche.value.toLowerCase();
    const taskItems = activities.querySelectorAll('li');

    taskItems.forEach(task => {
        const taskText = task.querySelector('span').textContent.toLowerCase();
        if (taskText.includes(motRecherche)) {
            task.classList.remove('supprimer');
        } else {
            task.classList.add('supprimer');
        }
    });
});
