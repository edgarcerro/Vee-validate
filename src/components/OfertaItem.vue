<template>
  <tr>
    <td>{{ oferta.id }}</td>
    <td>{{ oferta.nombre }}</td>
    <td>{{ empresa.nombre }}</td>
    <td>{{ oferta.contacto }}</td>
    <td>{{ oferta.email }}</td>
    <td>
      <button class="btn btn-sm" @click="goTo('/edit/' + oferta.id)">
        <span class="bi bi-pencil"></span>
      </button>
      <button class="btn btn-sm" @click="delOferta">
        <span class="bi bi-trash"></span>
      </button>
      <button class="btn btn-sm" @click="goTo('/empresa/' + oferta.empresa)">
        <span class="bi bi-building"></span>
      </button>
    </td>
  </tr>
</template>

<script>
import api from '../api'

export default {
  name: "oferta-item",
  props: ["oferta"],
  computed: {
    empresa() {
      return this.$store.state.empresas.find((item) => item.id === this.oferta.empresa);
    },
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    delOferta() {
      if (
        confirm(`Vas a borrar la oferta
        ${this.oferta.nombre}
        con id ${this.oferta.id}`)
      ) {
        api.ofertas.delete(this.oferta.id)
        .then(() => this.$emit('elimina'))
        .catch((error) => alert(error))
      }
    },
  },
};
</script>