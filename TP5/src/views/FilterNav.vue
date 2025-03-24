<template>
    <div>
        <input type="text"  v-model="mots" placeholder="Rechercher" @input="Filtrer" required />
    </div>
</template>
<script>

export default {
        name : 'FilterNav',
        data(){
            return {
                mots : "" , 
            };
        }, 
        methods : {
            Filtrer(){
                this.$emit("filtrerJobs", this.mots);
            },
        },
    
}
</script>
<style scoped>
input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>