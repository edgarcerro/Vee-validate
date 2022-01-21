<template>
  <div class="row">
    <div class="col-sm-12">
      <h1>Listado de ofertas</h1>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Contacto</th>
            <th>email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <oferta-item
            v-for="(oferta, index) in ofertas"
            :key="oferta.id"
            :oferta="oferta"
            @elimina="delOferta(index)"
          ></oferta-item>
        </tbody>
      </table>
      <button @click="$router.push('/new')">Añadir oferta</button>
    </div>
  </div>

</template>

<script>
import OfertaItem from "../components/OfertaItem";
import api from '../api'

export default {
  name: "listado-ofertas",
  props: ["idEmpresa"],
  components: {
    OfertaItem,
  },
  data() {
      return {
          ofertas: []
      }
  },
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  mounted() {
      api.ofertas.getAllFromId(this.idEmpresa)
      .then((response) => this.ofertas = response.data)
      .catch((error) => alert(error))
  },
  methods: {
    delOferta(index) {
      this.ofertas.splice(index, 1)
    }
  }
};
</script>