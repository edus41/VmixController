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
    for (const equipoItem of equipos) {
      const { ip, port } = equipoItem
      let queryString = `http://${ip}:${port}/API/?Function=${func}${queryParams}`

      try {
        const response = await fetch(queryString)
        console.log('response :>> ', response)
      } catch (error) {
        console.log('error :>> ', error)
      }
    }
  } else {
    const { ip, port } = equipo
    let queryString = `http://${ip}:${port}/API/?Function=${func}${queryParams}`

    try {
      const response = await fetch(queryString)
      console.log('response :>> ', response)
    } catch (error) {
      console.log('error :>> ', error)
    }
  }
}
