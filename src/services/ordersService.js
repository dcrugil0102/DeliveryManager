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
