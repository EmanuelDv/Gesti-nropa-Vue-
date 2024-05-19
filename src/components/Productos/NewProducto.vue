<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Producto
        </div>
        <div class="card-body">
          <form @submit.prevent="saveProduct">
            <div class="row mb-3"> 
              <label for="id" class="form-label">Código</label> 
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" placeholder="Código Producto" disabled
                  v-model="producto.id">
              </div>
            </div>
  
            <div class="row mb-3"> 
              <label for="name" class="form-label">Nombre :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre Producto"
                  v-model="producto.nombre">
              </div>
            </div> 
  
            <div class="row mb-3"> 
              <label for="descripcion" class="form-label">Descripcion:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="descripcion" placeholder="Descripcion Producto"
                  v-model="producto.descripcion">
              </div>
            </div> 
  
            <div class="row mb-3"> 
              <label for="precio" class="form-label">Precio:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="precio" placeholder="Precio producto"
                  v-model="producto.precio">
              </div>
            </div> 
  
            <div class="row mb-3"> 
              <label for="Categoria_id" class="form-label">Categoría :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                <select class="form-select" v-model="producto.categoria_id">
                  <option selected value="0">Seleccione una Categoria</option>
                  <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row mb-3"> 
              <label for="stock" class="form-label">Stock:</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                <input type="text" class="form-control" id="stock" placeholder="Stock producto"
                  v-model="producto.stock">
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
    cancel() {
      this.$router.push({ name: "Productos" });
    },

    async saveProduct() {
      const res = await axios.post("http://127.0.0.1:8000/api/productos", this.producto);
      console.log(res);
      if (res.status == 200) {
        this.$router.push({ name: "Productos" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto ha sido guardado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/api/categorias").then((response) => {
      this.categorias = response.data.categorias;
    });
  },
};
</script>