const ajoute = document.querySelector('.add');
const taches = document.querySelector('.todos');
const elementRecherche = document.querySelector('.search input');
ajoute.addEventListener('submit', (s) => {
    s.preventDefault();

    const nouveau = ajoute.add.value.trim();

    if (nouveau.length != 0) {
        const nouvelletache = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${nouveau}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        taches.innerHTML += nouvelletache;
        ajoute.reset();
    }
});

taches.addEventListener('click', (s) => {
    if (s.target.classList.contains('delete')) {
        s.target.parentElement.remove();
    }
});

ajouter = document.querySelector(".search");
ajouter.addEventListener('submit', (e)=> { 
    e.preventDefault()
});

elementRecherche.addEventListener('input', () => {
    const mot = elementRecherche.value.toLowerCase();
    const lignes = taches.querySelectorAll('li');

    lignes.forEach(tache => {
        const contenutache = tache.querySelector('span').textContent.toLowerCase();
        if (contenutache.includes(mot)) {
            tache.classList.remove('supprimer');
        } else {
            tache.classList.add('supprimer');
        }
    });
});
