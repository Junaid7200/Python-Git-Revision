// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChatBotPage from "./pages/ChatBot";
import ClientPage from "./pages/ClientPage";
import ManagementPage from "./pages/management";

// Home component for the landing page
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold mb-8">Welcome!</h1>
      <div className="flex gap-4">
        <Link to="/chatbot">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            ChatBot
          </button>
        </Link>
        <Link to="/clients">
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            Clients Page
          </button>
        </Link>
        <Link to="/management/school">
          <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
            Management System
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Other routes */}
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/management/:entity" element={<ManagementPage />} />
      
        
        {/* Catch-all route for 404 */}
        {/* <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
                <Link to="/" className="text-blue-500 hover:underline">
                  Back to Home
                </Link>
              </div>
            </div>
          } 
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;