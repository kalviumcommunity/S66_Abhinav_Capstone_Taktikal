import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes/Allroutes'
import { AthleteProvider } from './context/AthleteContext'
import { CoachProvider } from './context/CoachContext'

const App = () => {
  return (
    <BrowserRouter>
      <CoachProvider>
        <AthleteProvider>
          <AllRoutes />
        </AthleteProvider>
      </CoachProvider>
    </BrowserRouter>
  )
}

export default App