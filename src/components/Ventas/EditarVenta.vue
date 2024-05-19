<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar</h1>
      <div class="card">
        <div class="card-header fw-bold">Venta</div>
        <div class="card-body">
          <form @submit.prevent="updateVenta">
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
                  placeholder="Código venta"
                  disabled
                  v-model="venta.id"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="producto_id" class="form-label">Producto:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="bank" />
                </div>
                <select class="form-select" v-model="venta.producto_id">
                  <option
                   v-for="producto in productos" 
                    :key="producto.id"
                    v-bind:value="producto.id">
                    {{ producto.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="cliente_id" class="form-label">Clientes:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="bank" />
                </div>
                <select class="form-select" v-model="venta.cliente_id">
                  <option
                   v-for="cliente in clientes" 
                    :key="cliente.id"
                    v-bind:value="cliente.id">
                    {{ cliente.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="cantidad" class="form-label">Cantidad:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="cantidad"
                  placeholder="cantidad venta"
                  v-model="venta.cantidad"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="fecha_venta" class="form-label">Fecha:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="fecha_venta"
                  placeholder="fecha venta"
                  v-model="venta.fecha_venta"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="total" class="form-label">Total:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="total"
                  placeholder="total venta"
                  v-model="venta.total"
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
  name: "EditarVenta",
  data() {
  return {
    venta: {
      id: 0,
      producto_id: 0,
      cliente_id: 0,
      cantidad: 0,
      fecha_venta: "",
      total: 0
    },
    productos: [], 
    clientes: [] 
  };
},
  methods: {
    cancelar() {
      this.$router.push({ name: "Ventas"  });
    },
    async updateVenta() {
      const res = await axios.put(
       ` http://127.0.0.1:8000/api/ventas/${this.venta.id}`,
        this.venta
      );
      if (res.status == 200) {
        this.$router.push({ name: "Ventas" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Venta Actualizada con exito",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    this.venta.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/ventas/${this.venta.id}`)
      .then((response) => {
        this.venta = response.data.venta;
        this.productos = response.data.productos;
        this.clientes = response.data.clientes;

      });
  },
};
</script>