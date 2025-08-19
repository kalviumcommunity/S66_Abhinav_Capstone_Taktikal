import React from 'react'
import AllRoutes from './routes/Allroutes'
import { AthleteProvider } from './context/AthleteContext'
import { CoachProvider } from './context/CoachContext'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <CoachProvider>
        <AthleteProvider>
          <AllRoutes />
        </AthleteProvider>
      </CoachProvider>
    </AuthProvider>
  )
}

export default App