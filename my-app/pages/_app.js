import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../public/css/common.css'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
