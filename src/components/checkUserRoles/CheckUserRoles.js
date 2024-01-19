import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"

const CheckUserRoles = ({ authorizedRoles }) => {
    const location = useLocation()
    const { auth } = useAuthContext()
    const userRoles = auth?.assignedRoles

    const desiredDestination = location.pathname

    // check if user is authorized to view resource
    const result = authorizedRoles.includes(userRoles)

    return (
        <>
            {result
                ? <Outlet />
                : auth?.assignedRoles
                    ? <Navigate to={'/unauthorized'} state={desiredDestination} replace />
                    : <Navigate to={'/login'} state={desiredDestination} replace />
            }
        </>
    )
}

export default CheckUserRoles