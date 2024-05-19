<template>
    <div class="container">
      <h1>
        Listado Ventas
        <button @click="newVenta" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cliente</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <th scope="row">{{ venta.id }}</th>
            <td>{{ venta.producto_nombre }}</td>
            <td>{{ venta.cliente_nombre }} {{ venta.cliente_apellido }}</td>
            <td>{{ venta.cantidad }}</td>
            <td>{{ venta.fecha_venta }}</td>
            <td>{{ venta.total }}</td>

            <td>
              <button
                @click="deleteVenta(venta.id)"
                class="btn btn-danger mx-2"
              >
                <font-awesome-icon icon="trash" />
              </button>
              <button
                @click="editVenta(venta.id)"
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
  name: "Venta",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      ventas: [],
    };
  },
  methods: {
    async deleteVenta(id) {
      const result = await Swal.fire({
        title: `Estas seguro de eliminar el Ventas con id ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      });
      
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/ventas/${id}`);
          if (response.data.success) {
            Swal.fire("¡Eliminado!", "", "success");
            this.products = this.ventas.filter(venta => venta.id !== id);
            this.ventas = response.data.ventas;

          }
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al eliminar la venta.", "error");        }
      }
    },
    editVenta(id) {
      this.$router.push({ name: 'EditarVenta', params: { id } });
    },
    newVenta() {
      this.$router.push({ name: 'NewVenta' });
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ventas`);
      this.ventas = response.data.ventas;
    } catch (error) {
      Swal.fire("¡Error!", "Hubo un error al obtener los ventas.", "error");
    }
  }
};
</script>
