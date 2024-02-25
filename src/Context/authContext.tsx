import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    // createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../Firebase";
import {
    doc,
    // setDoc, 
    getDoc
} from "firebase/firestore";
import { Link } from "expo-router";
// import { useNavigate } from "react-router-dom";

interface AuthContextProps {
    // signUp: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logOut: () => void;
    // loginWithGoogle: () => void;
    resetPassword: (email: string) => void;
    user: any;
    loading: boolean;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no auth provider");
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    // const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // const signUp = (email: string, password: string): void => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((creds) =>
    //             setDoc(doc(db, "users", creds.user.uid), { rol: "user" })
    //         )
    //         .then(() => navigate("/Dashboard"));
    // };

    const login = async (email: string, password: string): Promise<void> => {
        signInWithEmailAndPassword(auth, email, password)
            .then((creds) => {
                getDoc(doc(db, "users", creds.user.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        switch (docSnap.data().rol) {
                            case "admin":
                                // navigate("/AdminView");
                                <Link href="/" />
                                break;
                            case "user":
                                // navigate("/dashboard/home");
                                <Link href="/" />
                                break;
                        }
                    }
                });
            });
    };

    const logOut = async (): Promise<void> => {
        await signOut(auth);
        // navigate("/")
        <Link href="/" />
    };


    // const loginWithGoogle = (): void => {
    //     const googleProvider = new GoogleAuthProvider();
    //     signInWithPopup(auth, googleProvider);
    // };


    const resetPassword = async (email: string): Promise<void> => {
        try {
            // Espera a que la promesa se resuelva antes de continuar
            await sendPasswordResetEmail(auth, email);

            console.log(`Correo de restablecimiento de contraseña enviado a ${email}`);
        } catch (error: any) {
            // Proporciona un tipo explícito para 'error'
            console.error(`Error al enviar el correo de restablecimiento de contraseña: ${error.message}`);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const contextValue: AuthContextProps = {
        // signUp,
        login,
        logOut,
        resetPassword,
        user,
        loading,
    };

    return (
        <authContext.Provider value={contextValue}>{children}</authContext.Provider>
    );
}
