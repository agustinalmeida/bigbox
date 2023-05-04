<template>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="mt-5">
              <h1 class="text-center">Test - Agustín Almeida</h1>
              <router-link to="/actividades" class="btn-primary mx-auto d-table">Ver test</router-link>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
</template>

<script>
export default {
  name: 'HomeApp',
  props: {
    
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
