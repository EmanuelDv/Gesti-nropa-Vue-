import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Productos from "@/views/Productos.vue";
import NewProducto from "@/components/Productos/NewProducto.vue";
import EditarProducto from "@/components/Productos/EditarProducto.vue";
import Ventas from "../views/Ventas.vue";
import NewVenta from "@/components/Ventas/NewVenta.vue";
import EditarVenta from "@/components/Ventas/EditarVenta.vue";

import Proveedores from "../views/Proveedores.vue";
import NewProveedor from "@/components/Proveedores/NewProveedor.vue";
import EditarProveedor from "@/components/Proveedores/EditarProveedor.vue";

import Categorias from "../views/Categorias.vue";
import NewCategoria from "@/components/Categorias/NewCategoria.vue";
import EditarCategoria from "@/components/Categorias/EditarCategoria.vue";

import Clientes from "../views/Clientes.vue";
import NewCliente from "@/components/Clientes/NewCliente.vue";
import EditarCliente from "@/components/Clientes/EditarCliente.vue";




const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/productos",
    name: "Productos",
    component: Productos,
  },
  {
    path: "/add-producto/",
    name: "NewProducto",
    component: NewProducto,
  },
  {
    path: "/editar-producto/:id",
    name: "EditarProducto",
    component: EditarProducto,
  },
  {
    path: "/ventas",
    name: "Ventas",
    component: Ventas,
  },
  {
    path: "/add-venta/",
    name: "NewVenta",
    component: NewVenta,
  },
  {
    path: '/editar-venta/:id', 
    name: 'EditarVenta',
    component: EditarVenta,
  },



{
    path: "/proveedores",
    name: "Proveedores",
    component: Proveedores,
  },
  {
    path: "/add-proveedor/",
    name: "NewProveedor",
    component: NewProveedor,
  },
  {
    path: "/editar-proveedor/:id",
    name: "EditarProveedor",
    component: EditarProveedor,
  },


  
{
  path: "/categorias",
  name: "Categorias",
  component: Categorias,
},
{
  path: "/add-categoria/",
  name: "NewCategoria",
  component: NewCategoria,
},
{
  path: "/editar-categoria/:id",
  name: "EditarCategoria",
  component: EditarCategoria,
},

 
{
  path: "/clientes",
  name: "Clientes",
  component: Clientes,
},
{
  path: "/add-cliente/",
  name: "NewCliente",
  component: NewCliente,
},
{
  path: "/editar-cliente/:id",
  name: "EditarCliente",
  component: EditarCliente,
},

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
