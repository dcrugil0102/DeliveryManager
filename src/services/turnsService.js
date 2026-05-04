import { updateDriver, getDrivers } from './driversService'

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

export async function updateTurn(id, turn) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(turn),
  })

  if (!res.ok) {
    throw new Error('Error al actualizar turno')
  }

  return res.json()
}

export async function syncTurnsStatus() {
  const turns = await getTurns()
  const drivers = await getDrivers()

  const now = new Date()
  const currentHour = now.toTimeString().slice(0, 5)
  const currentDate = now.toLocaleDateString('en-CA') // YYYY-MM-DD

  for (const turn of turns) {
    let newStatus

    if (turn.fecha === currentDate) {
      if (currentHour >= turn.horaInicio && currentHour <= turn.horaFin) {
        newStatus = 'en curso'
      } else if (currentHour > turn.horaFin) {
        newStatus = 'finalizado'
      } else {
        newStatus = 'programado'
      }
    } else if (turn.fecha < currentDate) {
      newStatus = 'finalizado'
    } else {
      newStatus = 'programado'
    }

    if (newStatus !== turn.estado) {
      await updateTurn(turn.id, {
        estado: newStatus,
      })
    }

    const driver = drivers.find((driver) => Number(driver.id) === Number(turn.repartidorId))

    if (!driver) continue

    let newDriverStatus = driver.estado

    if (newStatus === 'en curso') {
      newDriverStatus = 'disponible'
    }

    if (newStatus === 'finalizado') {
      newDriverStatus = 'fuera de servicio'
    }

    if (newDriverStatus !== driver.estado) {
      await updateDriver(driver.id, {
        estado: newDriverStatus,
      })

      driver.estado = newDriverStatus
    }
  }
}
