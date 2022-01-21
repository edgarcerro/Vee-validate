<template>
  <div class="container form-oferta">
    <h1>{{ editing ? "Editar oferta" : "Añadir oferta" }}</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.prevent="handleSubmit(save)">
        <input
          v-if="editing"
          placeholder="Id"
          v-model="oferta.id"
          type="text"
          class="form-control"
          disabled
        />

        <ValidationProvider
          rules="required|min:10|max:50"
          v-slot="{ errors }"
          name="Nombre"
        >
          <input
            placeholder="Nombre"
            v-model="oferta.nombre"
            type="text"
            class="form-control"
            autofocus
            minLength="10"
            maxLength="50"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }" name="Empresa">
          <select
            placeholder="Empresa"
            v-model="oferta.empresa"
            class="form-control"
            required
          >
            <option :value="undefined">--- Selecciona empresa ---</option>
            <option
              v-for="empresa in empresas"
              :key="empresa.id"
              :value="empresa.id"
              @select="changeContactEmail(empresa.id)"
            >
              {{ empresa.nombre }}
            </option>
          </select>
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          rules="required"
          v-slot="{ errors }"
          name="Contacto"
        >
          <input
            placeholder="Contacto"
            v-model="oferta.contacto"
            type="text"
            class="form-control"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          rules="required|email"
          v-slot="{ errors }"
          name="E-mail"
        >
          <input
            placeholder="E-mail"
            v-model="oferta.email"
            type="email"
            class="form-control"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>

        <br />
        <button type="submit" class="btn btn-default btn-primary">
          Guardar
        </button>
        <button type="button" @click="cancel" class="btn btn-danger">
          Cancelar
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import api from "../api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import {
  required,
  min,
  max,
  email
 
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Debes insertar algo en este campo",
});

extend("min", {
  ...min,
  message: "El nombre debe tener mínimo 10 letras",
});

extend("max", {
  ...max,
  message: "El nombre debe tener máximo 50 letras",
});

extend("email", {
  ...email,
  message: "Debes introducir un email válido",
});


export default {
  name: "form-ofertas",
  props: ["id"],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  data() {
    return {
      oferta: {},
      editing: false,
    };
  },
  mounted() {
    if (this.id) {
      this.editing = true;
      this.cargaOferta();
    }
  },
  methods: {
    cargaOferta() {
      api.ofertas
        .getOne(this.id)
        .then((response) => (this.oferta = response.data))
        .catch((error) => alert(error));
    },
    save() {
      if (this.editing) {
        api.ofertas
          .modify(this.oferta)
          .then(() => this.$router.push("/ofertas/" + this.oferta.empresa))
          .catch((error) => alert(error));
      } else {
        api.ofertas
          .create(this.oferta)
          .then(() => this.$router.push("/ofertas/" + this.oferta.empresa))
          .catch((error) => alert(error));
      }
    },
    cancel() {
      this.$router.push("/empresas");
    },
    changeContactEmail(empresaId) {
      this.oferta.contacto = this.$store.state.empresas.find((item) => item.id === empresaId).contacto
      this.oferta.email = this.$store.state.empresas.find((item) => item.id === empresaId).email

    },
  },
};
</script>