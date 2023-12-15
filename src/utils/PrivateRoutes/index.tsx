import { getToken } from '../../helpers/Token'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = getToken()
  if(!token){
    return <Navigate to={'/'} />
  }
  return <Outlet />
}

export default PrivateRoutes