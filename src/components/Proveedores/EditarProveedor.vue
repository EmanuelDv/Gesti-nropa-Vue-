<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Proveedor</h1>
      <div class="card">
        <div class="card-header fw-bold">Proveedor</div>
        <div class="card-body">
          <form @submit.prevent="updateProveedor">
            <div class="row mb-3">
              <label for="id" class="form-label">Código</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  placeholder="Código Proveedor"
                  disabled
                  v-model="proveedor.id"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Nombre del Proveedor"
                  v-model="proveedor.nombre"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="contacto" class="form-label">Contacto</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="phone" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="contacto"
                  placeholder="Contacto del Proveedor"
                  v-model="proveedor.contacto"
                />
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Actualizar</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "EditarProveedor",
    data() {
      return {
        proveedor: {
          id: 0,
          nombre: "",
          contacto: ""
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Proveedores" });
      },
      async updateProveedor() {
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/proveedores/${this.proveedor.id}`,
            this.proveedor
          );
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Proveedor actualizado con éxito",
              showConfirmButton: false,
              timer: 2000
            });
            this.$router.push({ name: "Proveedores" });
          }
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al actualizar el proveedor.", "error");
        }
      },
      async fetchProveedor() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/proveedores/${this.$route.params.id}`);
          this.proveedor = response.data.proveedor;
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al obtener el proveedor.", "error");
        }
      }
    },
    mounted() {
      this.fetchProveedor();
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  
  .card {
    margin-top: 20px;
  }
  
  .btn {
    margin-top: 10px;
  }
  </style>
  