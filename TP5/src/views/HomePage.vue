<template>
    <div>
        <FilterNav @filtrerJobs="filterJobs"></FilterNav>
        <div v-for="job in filteredJobs" :key="job.id">
           <br>
                {{ job.titre }}<br><br>
                {{ job.description }}<br>
                Salary:  {{ job.salaire }}<br>
                Date de création: {{ job.date }}<br><br>
                <router-link :to="'/detail/' + job.id"><button>Details</button></router-link>
                <router-link :to="'/editJob/' + job.id"><button>Modifier</button></router-link>
                <button @click="supprimer(job.id)">Supprimer</button>            
        </div>
    </div>
</template>
<script>
import FilterNav from "./FilterNav.vue"

export default {
    name:'HomePage',
    components:{FilterNav},

    props:["id"],

    data(){
        return {
            jobs:[],
            filteredJobs:[],
        };
    },
    async mounted(){
        await this.fetchData();
    },
    methods:{
        async fetchData(){
        try{
            const response = await fetch("http://localhost:3010/jobs");
            this.jobs = await response.json();
            this.filteredJobs=this.jobs;
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
    },
    async supprimer(jobId) {
    try {
        const answer = window.confirm("Voulez-vous vraiment supprimer ce job ?");
        if (!answer) {
            return;
        }
        const response = await fetch(`http://localhost:3010/jobs/${jobId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        this.jobs = this.jobs.filter(job => job.id !== jobId);
        this.filteredJobs = this.jobs;

        this.$router.push('/');

    } catch (error) {
        console.error("Error deleting job:", error);
    }
}

    ,
        filterJobs(text){
            const search = text.toLowerCase();
            this.filteredJobs = this.jobs.filter( (job) => job.titre.toLowerCase().includes(search) );
},


    }
}
</script>

<style>
div {
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
}

button {
  background-color: rgb(22, 114, 114);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #000000;
}

.filter-nav {
  margin-bottom: 20px;
}

.filter-nav input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}
</style>