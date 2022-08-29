// 本地存储——持久化存储token
export const setToken = (token) => {
  localStorage.setItem("TOKEN",token)
}

// 获取本地token
export const getToken = () => {
  return localStorage.getItem("TOKEN")
}

// 清除本地token
export const clearToken = () => {
  return localStorage.removeItem('TOKEN')
}