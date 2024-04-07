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
import {
  FIREBASE_AUTH as auth,
  FIREBASE_DB as db,
  FIREBASE_RTD as rtdb,
} from '../../Firebase';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  documentId,
  // setDoc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { router } from 'expo-router';
import { off, onValue, ref } from 'firebase/database';

export const useAccountData = () => {
  try {
    const { user } = useAuth();
    const [accountData, setAccountData] = useState<any>('');

    const getAccountData = async () => {
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
          ...doc.data(),
        }));

        // Obtener datos de la subcolección "doctors"
        const doctorsCollectionRef = collection(docSnap.ref, 'doctors');
        const doctorsQuerySnapshot = await getDocs(doctorsCollectionRef);
        const doctorsData = doctorsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Incluir datos de las subcolecciones en los datos de la cuenta
        const updatedAccountData = {
          ...accountInfo,
          patients: patientsData,
          doctors: doctorsData,
        };

        setAccountData(updatedAccountData);
      } else {
        alert('No such Document');
      }
    };

    useEffect(() => {
      getAccountData();
    }, [user.uid]);

    const reload = async () => {
      await getAccountData();
    };

    const listenToRealtimeData = (
      device: string,
      callback: (data: any) => void
    ) => {
      const databaseRef = ref(rtdb, `/dispositivos/${device}`);
      const unsubscribe = onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          callback(data);
        }
      });

      return () => {
        unsubscribe();
      };
    };

    // send data to a subcollection in patient called vitalSigns
    const storeVitalSigns = async (patientId: string, data: any) => {
      const documentId = user.uid;

      const patientDocRef = doc(
        db,
        'accounts',
        documentId,
        'patients',
        patientId
      );
      const vitalSignsCollectionRef = collection(patientDocRef, 'vitalSigns');
      await addDoc(vitalSignsCollectionRef, data);
    };

    const getVitalSigns = async (patientId: string) => {
      const documentId = user.uid;

      const patientDocRef = doc(
        db,
        'accounts',
        documentId,
        'patients',
        patientId
      );
      const vitalSignsCollectionRef = collection(patientDocRef, 'vitalSigns');

      const vitalSignsQuerySnapshot = await getDocs(vitalSignsCollectionRef);
      const vitalSignsData = vitalSignsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return vitalSignsData;
    };

    // const listenToRealtimeData = (device: string): Promise<any> => {
    //   return new Promise((resolve, reject) => {
    //     const databaseRef = ref(rtdb, `/dispositivos/${device}`);
    //     onValue(databaseRef, (snapshot) => {
    //       const data = snapshot.val();
    //       console.log(data);
    //       if (data) {
    //         resolve(data);
    //       } else {
    //         reject('No data');
    //       }
    //     });
    //   });
    // };

    const getPatient = async (id: string) => {
      if (accountData && accountData.patients) {
        const patient = accountData.patients.find(
          (patient: any) => patient.id === id
        );
        return patient;
      } else {
        console.error('accountData or accountData.patients is undefined');
        return null;
      }
    };

    return {
      accountData,
      reload,
      getPatient,
      listenToRealtimeData,
      storeVitalSigns,
      getVitalSigns,
    };
  } catch (err) {
    console.error(err);
  }
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

export function logOut(): void {
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
