<template>
    <form class="formulaire" @submit.prevent="modifier">
      <legend>Modifier un emploi</legend><br>
      
      <label for="titre">Titre</label>
      <input type="text" id="titre" v-model="job.titre"><br>
  
      <label for="description">Description</label>
      <input type="text" id="description" v-model="job.description"><br>
  
      <label for="salaire">Salaire</label>
      <input type="text" id="salaire" v-model="job.salaire"><br>
  
      <label for="date de création">Date de création</label>
      <input type="text" id="date de création" v-model="job.date"><br>
  
      <button type="submit">Modifier</button>
    </form>
</template>

<script>
export default {
    name: 'EditJob',
    props:['id'],
    data() {
        return {
            job: {
                titre: '',
                description: '',
                salaire: '',
                date: ''
            }
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            const jobId = this.$route.params.id;  
            try {
                const response = await fetch(`http://localhost:3010/jobs/${jobId}`);
                const job = await response.json();
                if (job) {
                    this.job = {  
                        titre: job.titre,
                        description: job.description,
                        salaire: job.salaire,
                        date: job.date
                    };
                }
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        },
        async modifier() {
            const jobId = this.$route.params.id;  
            try {
                const response = await fetch(`http://localhost:3010/jobs/${jobId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.job)  
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                this.$router.push('/');  
            } catch (error) {
                console.error("Error updating job:", error);
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
  color:rgb(30, 143, 143);
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