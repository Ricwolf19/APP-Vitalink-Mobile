import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FIREBASE_AUTH as auth, FIREBASE_DB as db } from '../../Firebase';
import {
  collection,
  collectionGroup,
  doc,
  documentId,
  // setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { router } from 'expo-router';

export const useAccountData = () => {
  const { user } = useAuth();
  const [accountData, setAccountData] = useState<any>('');

  const getAccountData = async () => {
    try {
      const accountsCollectionRef = collection(db, 'accounts');
      const documentId = user.uid;

      const docSnap = await getDoc(doc(accountsCollectionRef, documentId));
      if (docSnap.exists()) {
        const accountInfo = docSnap.data();

        // Obtener datos de la subcolección "patients"
        const patientsCollectionRef = collection(docSnap.ref, 'patients');
        const patientsQuerySnapshot = await getDocs(patientsCollectionRef);
        const patientsData = patientsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Obtener datos de la subcolección "doctors"
        const doctorsCollectionRef = collection(docSnap.ref, 'doctors');
        const doctorsQuerySnapshot = await getDocs(doctorsCollectionRef);
        const doctorsData = doctorsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Incluir datos de las subcolecciones en los datos de la cuenta
        const updatedAccountData = {
          ...accountInfo,
          patients: patientsData,
          doctors: doctorsData
        };

        setAccountData(updatedAccountData);
      } else {
        alert('No such Document');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccountData();
  }, [user.uid]);

  const reload = async () => {
    await getAccountData(); // Llamar a la función getAccountData para recargar los datos
  };

  return { accountData, reload };
};




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
  if (!context) throw new Error('There is no auth provider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function logOut (): void {
  signOut(auth);
  router.replace('/Login');
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  // const signUp = (email: string, password: string): void => {
  //     createUserWithEmailAndPassword(auth, email, password)
  //         .then((creds) =>
  //             setDoc(doc(db, "users", creds.user.uid), { rol: "user" })
  //         )
  //         .then(() => navigate("/Dashboard"));
  // };

  const login = async (email: string, password: string): Promise<void> => {
    signInWithEmailAndPassword(auth, email, password).then((creds) => {
      getDoc(doc(db, 'accounts', creds.user.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          router.navigate('/Home');
          // switch (docSnap.data().rol) {
          //   case 'personal':
          //     navigate('/AdminView');
          //     break;
          //   case 'hospital':
          //     navigate('/dashboard/home');
          //     break;
          // }
        }
      });
    });
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);
    router.replace('/Login');
  };

  // const loginWithGoogle = (): void => {
  //     const googleProvider = new GoogleAuthProvider();
  //     signInWithPopup(auth, googleProvider);
  // };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      // Espera a que la promesa se resuelva antes de continuar
      await sendPasswordResetEmail(auth, email);

      console.log(
        `Correo de restablecimiento de contraseña enviado a ${email}`
      );
    } catch (error: any) {
      // Proporciona un tipo explícito para 'error'
      console.error(
        `Error al enviar el correo de restablecimiento de contraseña: ${error.message}`
      );
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
