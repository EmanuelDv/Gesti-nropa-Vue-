<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/productos">Productos</router-link> |
    <router-link to="/ventas">Ventas</router-link> |
    <router-link to="/proveedores">Proveedores</router-link> |



  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.swal2-container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 100% !important;
  min-height: 100vh !important;
}
.swal2-popup {
  margin: auto !important; /* Center the modal within the container */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
