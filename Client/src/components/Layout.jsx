
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#212121] overflow-x-hidden">
      <div className="lg:flex">
        <Sidebar />
        <div className="flex-1 w-full max-w-full lg:max-w-[calc(100vw-200px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
