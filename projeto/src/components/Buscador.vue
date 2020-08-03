<template>
  <div class="buscador container">
    <p class="h1">Buscador</p>
    <input class="form-control" type="text" name="buscador" v-model="termo">
    <table class="table" v-if="listaEmpresasEncontradas">
      <thead>
        <tr>
          <th scope="col">Registro ANS</th>
          <th scope="col">Razão Social</th>
          <th scope="col">CNPJ</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="empresa in listaEmpresasEncontradas" :key="empresa">
            <th scope="row">{{empresa["Registro ANS"]}}</th>
            <td>{{empresa["Razão Social"]}}</td>
            <td>{{empresa.CNPJ}}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
let Data = 0;
import Fuse from 'fuse.js';
import axios from 'axios';

export default {
  name: 'Buscador',
  data() {
    return {
      termo: '',
    }
  },
    created () {
      this.preencherLista()
  },
    methods: {
    preencherLista(){
      axios.get('http://localhost:5000/csv').then(res =>{
        Data = res.data;
      })
    },
  },
  computed: {
    listaEmpresasEncontradas() {
      const fuseConfig = {
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'Razão Social',
        ],
      };
      const fuse = new Fuse(Data, fuseConfig);
      return fuse.search(this.termo);
    },
  }
}
</script> 

<style scoped>

</style>
