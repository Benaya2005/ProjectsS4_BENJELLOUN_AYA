
    <template>
        <div>        <h2>{{ $route.params.id }}</h2>
        </div>
    <div v-if="job">
        <h2>{{ job.titre }}</h2>
        <p>{{ job.description }}</p>
        <p>{{ job.salaire }}</p>
        <p>{{ job.date }}</p>
        <router-link :to="'/editJob/' + job.id">  
            <button>Modifier</button>  
        </router-link>
        <button type="button" @click="supprimer">Supprimer</button>
    </div>
    <div v-else>
        <p>Job not found.</p>
    </div>
</template>


<script>
export default {
    name: 'JobDetail',
    props: ['id'],
    data() {
        return {
            job: null
        };
    },
    async mounted() {
        await this.fetchJob();

    },
    methods: {
        async fetchJob() {
    try {
        const response = await fetch('http://localhost:3010/jobs/' + this.id);
        
        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch job: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched job data:", data); // Log the job data to ensure it's correct
        
        if (!data) {
            throw new Error("Job not found in the response");
        }

        this.job = data;
    } catch (error) {
        console.error("Error fetching job:", error);
    }
},

        async supprimer() {
            try {
                const confirm = window.confirm("Etes vous sûrs de vouloir supprimer?");
                if (!confirm) {
                    return;
                }
                const response = await fetch('http://localhost:3010/jobs'+this.id, {
                    method: 'DELETE'
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                this.$router.push('/'); // return to home after adding job 
            } catch (error) {
                console.error("Error deleting job:", error);
            }
        }
    }
}
</script>
<style scoped>
div {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  color: rgb(22, 114, 114);
  margin-bottom: 15px;
}

p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
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
</style>