import React, { createContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  login?: {
    title: string;
    message: string;
    email: string;
    password: string;
    login: string;
    alerts: {
      'password-title': string;
      password: string;
      'email-title': string;
      email: string;
      'credential-title': string;
      credential: string;
    };
  };
  index?: {
    message: string;
  };
  layout?: {
    tabs?: {
      patients: string;
      doctors: string;
      profile: string;
    };
    patient: string;
    history: string;
  };
  card?: {
    doctor: string;
    age: string;
    blood: string;
    area: string;
    status: string;
    id: string;
    patients: string;
  };
  profile?: {
    username: string;
    logout: string;
    lang: string;
    es: string;
    en: string;
  };
  patients?: {
    done: string;
    success: string;
    notfound : string;
    error: string;
    signs: string;
    device: string;
    info: string;
    name: string;
    birth: string;
    area: string;
    allegies: string;
    diseases: string;
    save: string;
    history: string;
  };
  history?: {
    record: string;
    share: string;
    norecords: string;
  };
}

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  i18n: {
    [key in Language]: Translations;
  };
}

const i18n: I18nContextType['i18n'] = {
  en: {
    login: {
      title: 'Welcome Back',
      message: 'Sign in to continue',
      email: 'Enter your email',
      password: 'Enter your password',
      login: 'Login',
      alerts: {
        'password-title': 'Something is missing',
        password: 'Please enter your password',
        'email-title': 'Invalid email',
        email: 'Please enter a valid email',
        'credential-title': 'Invalid credentials',
        credential: 'Please enter a valid email and password',
      },
    },
    index: {
      message: 'Smart Monitoring, Real Results',
    },
    layout: {
      tabs: {
        patients: 'Patients List',
        doctors: 'Doctors List',
        profile: 'Profile & Settings',
      },
      patient: 'Patient Details',
      history: 'Vital signs history',
    },
    card: {
      doctor: 'Doctor assigned',
      age: 'years old',
      blood: 'Blood type',
      area: 'Area',
      status: 'Status',
      id: 'ID number',
      patients: 'Patients',
    },
    profile: {
      username: 'Username',
      logout: 'Logout',
      lang: 'Language',
      es: 'Spanish',
      en: 'English',
    },
    patients: {
      signs: 'Vital signs',
      device: 'No device connected',
      notfound: 'No device found',
      error: 'Please check the device connection',
      done: 'Record saved',
      success: 'Vital signs record saved successfully',
      info: 'Patient information',
      name: 'Full name',
      birth: 'Birthdate',
      area: 'Area assigned',
      allegies: 'Allergies',
      diseases: 'Chronic diseases',
      save: 'Save vital signs record',
      history: 'Vital signs history',
    },
    history: {
      record: 'Record',
      share: 'Share history as PDF',
      norecords: 'No records found',
    },
  },
  es: {
    login: {
      title: 'Bienvenido de Nuevo',
      message: 'Inicia sesión para continuar',
      email: 'Ingresa tu correo electrónico',
      password: 'Ingresa tu contraseña',
      login: 'Iniciar sesión',
      alerts: {
        'password-title': 'Falta algo',
        password: 'Por favor ingresa tu contraseña',
        'email-title': 'Correo electrónico inválido',
        email: 'Por favor ingresa un correo electrónico válido',
        'credential-title': 'Credenciales inválidas',
        credential:
          'Por favor ingresa un correo electrónico y contraseña válidos',
      },
    },
    index: {
      message: 'Monitoreo Inteligente, Resultados Reales',
    },
    layout: {
      tabs: {
        patients: 'Lista de Pacientes',
        doctors: 'Lista de Doctores',
        profile: 'Perfil y Ajustes',
      },
      patient: 'Detalles del Paciente',
      history: 'Historial de signos vitales',
    },
    card: {
      doctor: 'Doctor asignado',
      age: 'años',
      blood: 'Tipo de sangre',
      area: 'Área',
      status: 'Estado',
      id: 'Número de cédula',
      patients: 'Pacientes',
    },
    profile: {
      username: 'Nombre de usuario',
      logout: 'Cerrar sesión',
      lang: 'Idioma',
      es: 'Español',
      en: 'Inglés',
    },
    patients: {
      signs: 'Signos vitales',
      device: 'No hay dispositivo conectado',
      notfound: 'No se encontró dispositivo',
      error: 'Por favor revisa la conexión del dispositivo',
      done: 'Registro guardado',
      success: 'Registro de signos vitales guardado exitosamente',
      info: 'Información del paciente',
      name: 'Nombre completo',
      birth: 'Fecha de nacimiento',
      area: 'Área asignada',
      allegies: 'Alergias',
      diseases: 'Enfermedades crónicas',
      save: 'Guardar registro de signos vitales',
      history: 'Historial de signos vitales',
    },
    history: {
      record: 'Registro',
      share: 'Compartir historial en PDF',
      norecords: 'No se encontraron registros',
    },
  },
};

// Create i18n context object
export const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  i18n: i18n,
});

interface I18nProviderProps {
  children: ReactNode;
}

// Create Provider component
export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    // Provide i18n context to all child components
    <I18nContext.Provider value={{ language, setLanguage, i18n }}>
      {children}
    </I18nContext.Provider>
  );
};
