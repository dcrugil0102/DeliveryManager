<template>
  <header
    class="h-20 bg-(--color-primary-light) flex items-center justify-between px-6 border-(--color-border)"
  >
    <!-- Izquierda -->
    <!-- <h1 class="text-lg font-semibold text-(--color-text-primary)">Dashboard</h1> -->

    <!-- Centro -->
    <div class="flex-1 mx-6">
      <div class="relative w-3/5">
        <!-- Icono lupa -->
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)"
        ></i>

        <!-- Input -->
        <input
          type="text"
          placeholder="Buscar..."
          class="w-full bg-(--color-primary-soft) rounded-lg pl-10 pr-4 py-2 text-sm outline-none"
        />
      </div>
    </div>

    <!-- Derecha -->
    <div class="flex items-center gap-4">
      <!-- Notificaciones -->
      <button class="text-xl text-(--color-primary-soft)">
        <i class="fa-solid fa-bell"></i>
      </button>

      <!-- Usuario -->
      <img
        class="w-10 rounded-full object-cover bg-white/10"
        src="@/assets/no-user-image.png"
        alt="Cuenta tienda"
      />

      <!-- Botón -->
      <!-- <button class="bg-(--color-secondary) text-white px-4 py-2 rounded-lg">+ Pedido</button> -->
    </div>
  </header>
</template>
