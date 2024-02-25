import { useAuth } from "../Context/authContext"
// import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Page() {

  const { user, logOut, loading } = useAuth() //Se exportan las propiedades necesarias para todo 

  const handleLogout = async () => { //Se crea una funcion asyncrona para poder deslogearse
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  /* if (!user) { //Si no se tiene usuario se redirige al login
    navigate('/login')
  } Esto esta en ProtectedRoute*/


  //{/*Mensaje logeando*/}
  if (loading) return <h1>Loading</h1>

  //console.log(user) //Se puede ver que el usuario esta activo ya con su autentificacion y se usara para poder darse cuenta de su logeo en diferentes sitios de la web

  return (
    <View className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <View className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <img src={user.photoURL || '/user-icon.jpg'} className="h-full w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome, {user.displayName || user.email}</h1>
        <br />
        <button className="mt-4 px-6 py-2 text-white bg-red-500 rounded-full transition-all transform hover:scale-110 hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
      </View>
    </View>
  )
}


// export default function Page() {
//   return (
//     <View className="flex flex-1">
//       <Header />
//       <Content />
//       <Footer />
//     </View>
//   );
// }

// function Content() {
//   return (
//     <View className="flex-1">
//       <View className="py-12 md:py-24 lg:py-32 xl:py-48">
//         <View className="container px-4 md:px-6">
//           <View className="flex flex-col items-center gap-4 text-center">
//             <Text
//               role="heading"
//               className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
//             >
//               Welcome to Project ACME
//             </Text>
//             <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
//               Discover and collaborate on amce. Explore our services now.
//             </Text>

//             <View className="gap-4">
//               <Link
//                 suppressHighlighting
//                 className="bg-black p-5 rounded-md text-white"
//                 href="./"
//               >
//                 Explore
//               </Link>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// function Header() {
//   const { top } = useSafeAreaInsets();
//   return (
//     <View style={{ paddingTop: top }}>
//       <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
//         <Link className="font-bold flex-1 items-center justify-center" href="./Login">
//           ACME
//         </Link>
//         <View className="flex flex-row gap-4 sm:gap-6">
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="./Login"
//           >
//             About
//           </Link>
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="./Login"
//           >
//             Product
//           </Link>
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="./Login"
//           >
//             Pricing
//           </Link>
//         </View>
//       </View>
//     </View>
//   );
// }

// function Footer() {
//   const { bottom } = useSafeAreaInsets();
//   return (
//     <View
//       className="flex shrink-0 bg-gray-100 native:hidden"
//       style={{ paddingBottom: bottom }}
//     >
//       <View className="py-6 flex-1 items-start px-4 md:px-6 ">
//         <Text className={"text-center text-gray-700"}>
//           © {new Date().getFullYear()} Me
//         </Text>
//       </View>
//     </View>
//   );
// }
