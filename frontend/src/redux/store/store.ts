import { configureStore } from "@reduxjs/toolkit"
// import userIdS from "../features/userId"
import userIdRed from '../features/userId'
import faceupRed from "../features/faceup"

const store=configureStore({
    reducer:{
        userIdSlice:userIdRed,
        faceCardSlice:faceupRed
    }
})
export default store