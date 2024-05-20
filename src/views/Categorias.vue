<template>
    <div class="container">
      <h1>
        Listado de Categorias
        <button @click="NewCategoria" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in categorias" :key="categoria.id">
            <th scope="row">{{ categoria.id }}</th>
            <td>{{ categoria.nombre }}</td>
            <td>{{ categoria.descripcion }}</td>
            <td>
              <button
                @click="deleteCategoria(categoria.id)"
                class="btn btn-danger mx-2"
              >
                <font-awesome-icon icon="trash" />
              </button>
              <button
                @click="editCategoria(categoria.id)"
                class="btn btn-warning mx-2"
              >
                <font-awesome-icon icon="pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  
  export default {
    name: "Categorias",
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        categorias: [],
      };
    },
    methods: {
      async deleteCategoria(id) {
        const result = await Swal.fire({
          title: `¿Estás seguro de eliminar la categoria con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: "Eliminar",
        });
  
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/categorias/${id}`);
            if (response.data.success) {
              Swal.fire("¡Eliminado!", "", "success");
              this.categorias = this.categorias.filter(categoria => categoria.id !== id);
            }
          } catch (error) {
            Swal.fire("¡Error!", "Hubo un error al eliminar la categoria.", "error");
          }
        }
      },
      editCategoria(id) {
        this.$router.push({ name: 'EditarCategoria', params: { id } });
      },
      NewCategoria() {
        this.$router.push({ name: 'NewCategoria' });
      }
    },
    async mounted() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/categorias`);
        this.categorias = response.data.categorias;
      } catch (error) {
        Swal.fire("¡Error!", "Hubo un error al obtener los categorias.", "error");
      }
    }
  };
  </script>