import Sidebar from './Sidebar'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#212121] overflow-x-hidden relative">
      {/* Global Background Elements */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0" />
      <div className="fixed inset-0 vignette-overlay pointer-events-none z-0" />

      {/* Animated Aurora Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#483C32]/15 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#a38b82]/10 rounded-full blur-[130px]"
        />
      </div>

      <div className="relative z-10 lg:flex">
        <Sidebar />
        <div className="flex-1 w-full min-w-0 lg:max-w-[calc(100vw-220px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
