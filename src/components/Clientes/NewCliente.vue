<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Cliente
        </div>
        <div class="card-body">
          <form @submit.prevent="saveCliente">
            <div class="row mb-3">
              <label for="id" class="form-label">Código</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" placeholder="Código Cliente" disabled v-model="cliente.id">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre del Cliente" v-model="cliente.nombre">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                <input type="text" class="form-control" id="apellido" placeholder="Apellido del Cliente" v-model="cliente.apellido">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
                <input type="email" class="form-control" id="email" placeholder="Correo Electrónico del Cliente" v-model="cliente.email">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
                <input type="text" class="form-control" id="telefono" placeholder="Teléfono del Cliente" v-model="cliente.telefono">
              </div>
            </div>
  
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "NewCliente",
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
      cancel() {
        this.$router.push({ name: "Clientes" });
      },
  
      async saveCliente() {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/clientes", this.cliente);
          console.log(res);
          if (res.status === 200) {
            this.$router.push({ name: "Clientes" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Cliente ha sido guardado",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error("Error al guardar el cliente:", error);
          Swal.fire("¡Error!", "Hubo un error al guardar el cliente.", "error");
        }
      },
    },
  };
  </script>
  