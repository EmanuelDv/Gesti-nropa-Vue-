<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar</h1>
      <div class="card">
        <div class="card-header fw-bold">producto</div>
        <div class="card-body">
          <form @submit.prevent="updateProduct">
            <div class="row mb-3">
              <label for="comu_codi" class="form-label">Código</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  placeholder="Código producto"
                  disabled
                  v-model="producto.id"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="comu_nomb" class="form-label">Nombre :</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Nombre producto"
                  v-model="producto.nombre"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="descripcion" class="form-label">Descripcion:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="Descripcion producto"
                  v-model="producto.descripcion"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="precio" class="form-label">Precio:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="precio"
                  placeholder="Precio producto"
                  v-model="producto.precio"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="categoria_id" class="form-label">Categoria:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="bank" />
                </div>
                <select class="form-select" v-model="producto.categoria_id">
                  <option
                   v-for="categoria in categorias" 
                    :key="categoria.id"
                    v-bind:value="categoria.id">
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="stock" class="form-label">Stock:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="stock"
                  placeholder="stock producto"
                  v-model="producto.stock"
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
  name: "EditarProducto",
  data() {
    return {
        producto: {
        id: 0,
        nombre: "",
        descripcion: "",
        precio: 0,
        categoria_id: 0,
        stock:0
      },
      categorias: [],
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Productos"  });
    },
    async updateProduct() {
      const res = await axios.put(
       ` http://127.0.0.1:8000/api/productos/${this.producto.id}`,
        this.producto
      );
      if (res.status == 200) {
        this.$router.push({ name: "Productos" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "producto Actualizado con exito",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    this.producto.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/productos/${this.producto.id}`)
      .then((response) => {
        this.producto = response.data.producto;
        this.categorias = response.data.categorias;
      });
  },
};
</script>