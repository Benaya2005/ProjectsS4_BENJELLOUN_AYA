<template>
    <form class="formulaire" @submit.prevent="ajouter">
    <legend>Ajouter un emploi</legend><br>
    <label for="titre">Titre</label>
    <input type="text" id="titre" v-model="newJob.titre"><br>
    <label for="description">Description</label>
    <input type="text" id="description" v-model="newJob.description"><br>
    <label for="salaire">Salaire</label>
    <input type="text" id="salaire" v-model="newJob.salaire"><br>
    <label for="date de création">Date de création</label>
    <input type="text" id="date de création" v-model="newJob.date"><br>
    <button type="submit">Ajouter</button>
</form>
</template>
<script>

export default{
    name:'AddJob',
    props:['id'],
    data(){
        return{
            newJob: {
                titre: '',
                description: '',
                salaire: '',
                date: ''
            }
        }
    },
    async mounted(){
        await this.fetchData();
    },
    methods:{
        async fetchData(){
        try{
            const response = await fetch("http://localhost:3010/jobs");
            this.jobs = await response.json();
            
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
    },
    async ajouter() {
    try {
        const response = await fetch("http://localhost:3010/jobs", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newJob)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const newJob = await response.json();  

        this.$router.replace('/');

        this.preventDefault;
    } catch (error) {
        console.error("Error adding job:", error);
    }
}
    }
}
</script>
<style scoped>
.formulaire {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

.formulaire legend {
  font-size: 24px;
  font-weight: bold;
  color: #128882;
  margin-bottom: 20px;
}

.formulaire label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.formulaire input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.formulaire button {
  background-color: rgb(22, 114, 114);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.formulaire button:hover {
  background-color: #000000;
}
</style>
