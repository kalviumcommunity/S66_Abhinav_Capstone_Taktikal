
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#212121]">
      <div className="lg:flex">
        <Sidebar />
        <div className="flex-1 lg:ml-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
