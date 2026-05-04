const BASE_URL = 'http://localhost:3000/repartidores'

export async function getDrivers() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Error al obtener los repartidores')
  }

  return response.json()
}

export async function createDriver(driver) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })

  if (!response.ok) {
    throw new Error('Error al crear el repartidor')
  }

  return response.json()
}

export async function deleteDriver(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Error al eliminar repartidor')
  }
}

export async function updateDriver(id, driver) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driver),
  })

  if (!res.ok) {
    throw new Error('Error al actualizar repartidor')
  }

  return res.json()
}
