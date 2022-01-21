<template>
  <div>
    <h1>Lista de empresas</h1>
    <table class="table table-striped table-hover">
      <thead>
        <th>Id</th>
        <th>Nombre</th>
        <th>Domicilio</th>
        <th>Localidad</th>
        <th>Contacto</th>
        <th>email</th>
        <th>Acciones</th>
      </thead>
      <tbody>
        <tr v-for="empresa in empresas" :key="empresa.id">
          <td>{{ empresa.id }}</td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.domicilio }}</td>
          <td>{{ empresa.localidad }}</td>
          <td>{{ empresa.contacto }}</td>
          <td>{{ empresa.email }}</td>
          <td>
            <button @click="verEmpresa(empresa.id)" class="btn btn-sm">
              <i class="bi bi-eye"></i>
            </button>
            <button @click="verOfertas(empresa.id)" class="btn btn-sm">
              <i class="bi bi-archive"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "listado-empresas",
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  methods: {
    verEmpresa(id) {
      this.$router.push("/empresa/" + id);
    },
    verOfertas(id) {
      this.$router.push("/ofertas/" + id);
    },
  },
};
</script>