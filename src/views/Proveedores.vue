<template>
    <div class="container">
      <h1>
        Listado de Proveedores
        <button @click="newProveedor" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proveedor, index) in proveedores" :key="proveedor.id">
            <th scope="row">{{ proveedor.id }}</th>
            <td>{{ proveedor.nombre }}</td>
            <td>{{ proveedor.contacto }}</td>
            <td>
              <button
                @click="deleteProveedor(proveedor.id)"
                class="btn btn-danger mx-2"
              >
                <font-awesome-icon icon="trash" />
              </button>
              <button
                @click="editProveedor(proveedor.id)"
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
    name: "Proveedores",
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        proveedores: [],
      };
    },
    methods: {
      async deleteProveedor(id) {
        const result = await Swal.fire({
          title: `¿Estás seguro de eliminar el proveedor con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: "Eliminar",
        });
  
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/proveedores/${id}`);
            if (response.data.success) {
              Swal.fire("¡Eliminado!", "", "success");
              this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
            }
          } catch (error) {
            Swal.fire("¡Error!", "Hubo un error al eliminar el proveedor.", "error");
          }
        }
      },
      editProveedor(id) {
        this.$router.push({ name: 'EditarProveedor', params: { id } });
      },
      newProveedor() {
        this.$router.push({ name: 'NewProveedor' });
      }
    },
    async mounted() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/proveedores`);
        this.proveedores = response.data.proveedores;
      } catch (error) {
        Swal.fire("¡Error!", "Hubo un error al obtener los proveedores.", "error");
      }
    }
  };
  </script>
  