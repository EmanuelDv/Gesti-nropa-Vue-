<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Venta
        </div>
        <div class="card-body">
          <form @submit.prevent="saveVenta">
            <div class="row mb-3"> 
              <label for="id" class="form-label">Código</label> 
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" placeholder="Código venta" disabled
                  v-model="venta.id">
              </div>
            </div>
  
            <div class="row mb-3">
            <label for="Producto_id" class="form-label">Producto :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
              <select class="form-select" v-model="venta.producto_id">
                <option selected value="0">Seleccione un Producto</option>
                <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                  {{ producto.nombre }}
                </option>
              </select>
            </div>
          </div>
  
          <div class="row mb-3">
            <label for="cliente_id" class="form-label">Cliente :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
              <select class="form-select" v-model="venta.cliente_id">
                <option selected value="0">Seleccione un Cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.nombre }} {{cliente.apellido }}
                </option>
              </select>
            </div>
          </div>
  
            <div class="row mb-3"> 
              <label for="cantidad" class="form-label">cantidad:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="cantidad" placeholder="cantidad"
                  v-model="venta.cantidad">
              </div>
            </div> 

            <div class="row mb-3"> 
              <label for="fecha_venta" class="form-label">fecha_venta:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="date" class="form-control" id="fecha_venta" placeholder="fecha_venta"
                  v-model="venta.fecha_venta">
              </div>
            </div> 
            <div class="row mb-3"> 
              <label for="total" class="form-label">Total:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="total" placeholder="Total"
                  v-model="venta.total">
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
  name: "EditarVenta",
  data() {
    return {
      venta: {
        id: 0,
        producto_id: 0,
        cliente_id: 0,
        cantidad: 0,
        fecha_venta: "",
        total:0
      },
      productos: [],
      clientes:[],
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Ventas" });
    },

    async saveVenta() {
        const res = await axios.post("http://127.0.0.1:8000/api/ventas", this.venta);
        if (res.status === 200) {
          this.$router.push({ name: "Ventas" });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Venta ha sido guardado",
            showConfirmButton: false,
            timer: 2000,
        });
      }
    },
  },
  mounted() {
  // Obteniendo productos
  axios.get("http://127.0.0.1:8000/api/productos")
    .then((response) => {
      this.productos = response.data.productos;
    })
    .catch((error) => {
      console.error("Error al obtener productos:", error);
    });

  // Obteniendo clientes
  axios.get("http://127.0.0.1:8000/api/clientes")
    .then((response) => {
      this.clientes = response.data.clientes;
    })
    .catch((error) => {
      console.error("Error al obtener clientes:", error);
    });
},
};
</script>
