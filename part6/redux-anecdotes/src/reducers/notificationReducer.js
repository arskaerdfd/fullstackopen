import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Lukija voi miettiä'

const notificationSlice = createSlice({
  name: 'notification',
  initialState
})

export default notificationSlice.reducer