<template>
    <div class="container">
      <h1>
        Listado Productos
        <button @click="newProduct" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Categoria</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="producto.id">
            <th scope="row">{{ producto.id }}</th>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.stock }}</td>

            <td>
              <button
                @click="deleteProduct(producto.id)"
                class="btn btn-danger mx-2"
              >
                <font-awesome-icon icon="trash" />
              </button>
              <button
                @click="editProduct(producto.id)"
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
  name: "Producto",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      productos: [],
    };
  },
  methods: {
    async deleteProduct(id) {
      const result = await Swal.fire({
        title: `Estas seguro de eliminar el Producto con id ${id}?`,
        showCancelButton: true,
        confirmButtonText: "Delete",
      });
      
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/productos/${id}`);
          if (response.data.success) {
            Swal.fire("¡Eliminado!", "", "success");
            this.products = this.productos.filter(producto => producto.id !== id);
            this.productos = response.data.productos;

          }
        } catch (error) {
          Swal.fire("¡Error!", "Hubo un error al eliminar el producto.", "error");        }
      }
    },
    editProduct(id) {
      this.$router.push({ name: 'EditarProducto', params: { id } });
    },
    newProduct() {
      this.$router.push({ name: 'NewProducto' });
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/productos`);
      this.productos = response.data.productos;
    } catch (error) {
      Swal.fire("¡Error!", "Hubo un error al obtener los productos.", "error");
    }
  }
};
</script>
