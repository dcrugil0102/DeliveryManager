const BASE_URL = 'http://localhost:3000/turnos'

export async function getTurns() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Error al obtener los turnos')
  }

  return response.json()
}

export async function createTurn(turn) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(turn),
  })

  if (!response.ok) {
    throw new Error('Error al crear el turno')
  }

  return response.json()
}
