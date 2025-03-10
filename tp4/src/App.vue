<template>
    <div id="app">
      <header>
        <img src="https://th.bing.com/th/id/OIP.ymN55bkaXHuCF37S7u7yiwHaFj?rs=1&pid=ImgDetMain" alt="LOGO">
        <h1>Les Bonnes Pièces</h1>
    </header>
    <main>
        <!-- Menu de recherche -->
        <section class="filtres">
            <h3>Filtres</h3>
            <input type="text" v-model="search" placeholder="Rechercher..."><br>
            <select v-model="categorie">
                <option value="">Toutes les catégories</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>            
                </select><br>
            <label>
                <input type="checkbox" v-model="dispo"> Disponible seulement
            </label><br>
            <button @click="tri = !tri">
                Trier par prix {{ tri ? 'décroissant' : 'croissant' }}
            </button>
        </section>

        <!-- Fiches produits --> 
        <section class="fiches">
            <div v-for="piece in piecesFiltrees" :key="piece.id" class="fiche">
                <img :src="piece.image" :alt="piece.nom">
                <h3>{{ piece.nom }}</h3>
                <p>{{ piece.prix }} dhs</p>
                <p>{{ piece.categorie }}</p>
                <div v-if="piece.disponible" class="disponible">En stock</div>
                <div v-else class="rupture">En rupture de stock</div>
                <button @click="ajouterAuPanier(piece)" :disabled="!piece.disponible">Ajouter au panier</button>
            </div>
        </section>


        <!-- Panier -->
        <section class="panier">
            <h3>Panier</h3>
            <ul>
                <li v-for="item in panier" :key="item.id">
                    {{ item.nom }} - {{ item.prix }} dhs
                </li>
            </ul>
        </section>
    </main>
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
return {
    pieces: [],
    search: '',
    categorie: '',
    dispo: false,
    tri: true,
    panier: []
};
},
computed: {
categories() {
    return [...new Set(this.pieces.map(piece => piece.categorie))];
},
piecesFiltrees() {
    let filtres = this.pieces;
    if (this.search) {
        filtres = filtres.filter(piece =>
            piece.nom.toLowerCase().includes(this.search.toLowerCase())
        );
    }
    if (this.categorie) {
        filtres = filtres.filter(piece => piece.categorie === this.categorie);
    }
    if (this.dispo) {
        filtres = filtres.filter(piece => piece.disponible);
    }
    filtres.sort((a, b) => this.tri ? a.prix - b.prix : b.prix - a.prix);

    return filtres;
}
},
methods: {
chargerPieces() {
    fetch('/pieces-auto.json')
        .then(response => response.json())
        .then(data => {
            this.pieces = data;
        })
        .catch(error => console.error('Erreur chargement pièces:', error));
},
ajouterAuPanier(piece) {
    this.panier.push(piece);
}
},
mounted() {
this.chargerPieces();
}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
	max-width: 1200px;
	margin: auto;
	padding: 16px;
	font-family: 'Montserrat', sans-serif;
}

header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
	padding: 8px;
	background-color: #2c0668;
	text-align: center;
	color: white;
}
header img {
	height: 60px;
	margin-left: 1rem;
}
header h1 {
	flex-grow: 1;
}

main {
	display: flex;
	flex-direction: row;
}
.filtres {
    border-radius: 8px;
    margin: 16px;
    padding: 16px;
    min-width: 250px;
    min-height: 400px;
    background-color: #f9f9f9;
}

.filtres h3 {
    text-align: center;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 16px;
}

.filtres input[type="text"],
.filtres select,
.filtres label {
    width: 100%;
    margin: 8px 0;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}



.filtres button {
    background-color: #2c0668;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 12px;
}

.filtres button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}




.fiches {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    min-width: 400px;
    padding: 20px;
}

.fiche {
    min-width: 100px;
    background-color: #dae0ff;
    border: 1px solid #d6d6d6;
    padding: 20px;
    width: calc(33.33% - 20px);  
    box-sizing: border-box;
}


.fiche img {
    width: 100%;
    height: auto;
    max-width: 120px; 
    margin-bottom: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.fiche h3 {
    font-size: 1.2em;
    color: #333;
    margin: 10px 0;
    text-align: center;
}
.fiche p {
    font-size: 0.9em;
    color: #555;
    text-align: center;
    margin: 5px 0;
}

.disponible {
    color: rgb(2, 92, 2);
    font-weight: bold;
    text-align: center;
}

.rupture {
    color: rgb(122, 3, 3);
    font-weight: bold;
    text-align: center;
}

.fiche button {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 1em;
    color: white;
    background-color: #2c0668;
    border: none;
    cursor: pointer;
}

.fiche button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
}

.panier{
    border-radius: 8px;
    margin: 16px;
    padding: 16px;
    min-width: 250px;
    min-height: 400px;
    background-color: #f9f9f9;
}
.panier h3{
        text-align: center;
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 16px;
    
}
</style>