import '@/styles/globals.css'
import '../../configureAmplify'
import NavBar from './components/navbar'

export default function App({ Component, pageProps }) {
  return(
    <div>
      <NavBar/>
      <div>
        
      </div>
      <Component {...pageProps} />
    </div>
  )

}