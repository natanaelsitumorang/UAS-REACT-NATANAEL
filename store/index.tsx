import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducer/Goreducer'


export default configureStore({
  reducer: {
    login: loginReducer,
  },
})