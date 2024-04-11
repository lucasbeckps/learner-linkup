export function isAuthTokenValid() {
  const token = localStorage.getItem('token')

  if (!token) {
    return false
  }

  const user = localStorage.getItem('user')

  if (!user) {
    return false
  }

  try {
    const userData = JSON.parse(user)

    const currentTime = Math.floor(Date.now() / 1000)

    return userData.exp > currentTime
  } catch (e) {
    console.error('Erro ao parsear o token:', e)
    return false
  }
}
