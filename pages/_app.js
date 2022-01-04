import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../hooks/useAuth'
import '../public/styles/globals.css'
import '../public/styles/app.css'


function MyApp({ Component, pageProps }) {

  const user = useAuth();

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
