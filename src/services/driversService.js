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
