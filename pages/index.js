import ContentManager from '../src/components/ContentManager'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '../src/components/reducer'
const store = configureStore({
  reducer: {
    data: reducer,
  },
})

export default function Index() {
  return (
    <Provider store={store}>
      <ContentManager />
    </Provider>
  )
}
