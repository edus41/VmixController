export async function vmixFetch(button, equipos) {
  const { func, value, input, duration, channel, equipo } = button
  let queryParams = ''

  if (input !== '') {
    queryParams += `&Input=${input}`
  }

  if (duration !== '') {
    queryParams += `&Duration=${duration}`
  }

  if (value !== '') {
    queryParams += `&Value=${value}`
  }

  if (channel !== '') {
    queryParams += `&Channel=${channel}`
  }

  if (equipo.name === 'All') {
    equipos.map(async (equipo) => {
      const { ip, port } = equipo
      const queryString = `http://${ip}:${port}/API/?Function=${func}${queryParams}`
      fetch(queryString)
        .then((r) => {
          console.log(`[SUCCESS]: ${ip}`)
        })
        .catch((e) => {
          console.log(`[ERROR]: ${ip}`)
        })
    })
  } else {
    const { ip, port } = equipo
    const queryString = `http://${ip}:${port}/API/?Function=${func}${queryParams}`
    fetch(queryString)
      .then((r) => {
        console.log(`[SUCCESS]: ${ip}`)
      })
      .catch((e) => {
        console.log(`[ERROR]: ${ip}`)
      })
  }
}
