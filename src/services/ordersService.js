const BASE_URL = 'http://localhost:3000/pedidos'

export async function getOrders() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Error al obtener los pedidos')
  }

  return response.json()
}

export async function createOrder(order) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    throw new Error('Error al crear el pedido')
  }

  return response.json()
}

export async function updateOrder(id, order) {
  const res = await fetch(`http://localhost:3000/pedidos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  if (!res.ok) {
    throw new Error('Error al actualizar el pedido')
  }

  return res.json()
}
