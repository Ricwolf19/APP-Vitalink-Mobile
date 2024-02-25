import { Link } from "expo-router";
import { useAuth } from "../Context/authContext";
// import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: any) { //funcion la cual comprueba que el usuario este logeado adentro de el sitio y con ello protejemos rutas de usuarios no logeadosd
    const { user, loading } = useAuth()

    if (loading) return <h1>loading</h1> //Devuelve el texto loading en la carga

    if (!user) return <Link href="/"/> //Si no hay un usuario logeado redireccion a el login

    return <>{children}</>

}