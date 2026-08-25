import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { Marketplace } from './pages/public/Marketplace';
import { VehicleDetails } from './pages/public/VehicleDetails';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-gold selection:text-black">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicles" element={<Marketplace />} />
                  <Route path="/vehicles/:id" element={<VehicleDetails />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
