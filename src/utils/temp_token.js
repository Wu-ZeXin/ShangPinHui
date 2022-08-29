import { v4 as uuidv4 } from 'uuid'

export const userTemp = () => {
  let userInfo = localStorage.getItem('USERINFO')

  if(!userInfo) {
    userInfo = uuidv4()

    localStorage.setItem('USERINFO',userInfo)
  }

  return userInfo
}