<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Cliente</h1>
      <div class="card">
        <div class="card-header fw-bold">Cliente</div>
        <div class="card-body">
          <form @submit.prevent="updateCliente">
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
                  placeholder="Código Cliente"
                  disabled
                  v-model="cliente.id"
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
                  placeholder="Nombre del Cliente"
                  v-model="cliente.nombre"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="apellido"
                  placeholder="Apellido del Cliente"
                  v-model="cliente.apellido"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="envelope" />
                </div>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Correo Electrónico del Cliente"
                  v-model="cliente.email"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="phone" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="telefono"
                  placeholder="Teléfono del Cliente"
                  v-model="cliente.telefono"
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
    name: "EditarCliente",
    data() {
      return {
        cliente: {
          id: 0,
          nombre: "",
          apellido: "",
          email: "",
          telefono: ""
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Clientes" });
      },
      async updateCliente() {
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/clientes/${this.cliente.id}`,
            this.cliente
          );
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Cliente actualizado con éxito",
              showConfirmButton: false,
              timer: 2000
            });
            this.$router.push({ name: "Clientes" });
          }
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al actualizar el cliente.", "error");
        }
      },
      async fetchCliente() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/clientes/${this.$route.params.id}`);
          this.cliente = response.data.cliente;
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al obtener el cliente.", "error");
        }
      }
    },
    mounted() {
      this.fetchCliente();
    }
  };
  </script>
  