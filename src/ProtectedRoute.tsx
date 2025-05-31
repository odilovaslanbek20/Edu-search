import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = {
  isAuth: boolean
}

const ProtectedRoute = ({ isAuth }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
