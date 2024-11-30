import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/loader/Loader";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import DataDeletionInstructions from "./pages/dataDeletionInstructions/DataDeletionInstructions";
import AdminSignup from "./pages/adminSignup/AdminSignup";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import Page from "./pages/Page/Page";
import AllPagesOfDhakaDT from "./pages/detachments/dhakaDetachment/AllPagesOfDhakaDT";
import DhakaSouth from "./pages/detachments/dhakaDetachment/DhakaSouth";
import DhakaNorth from "./pages/detachments/dhakaDetachment/DhakaNorth";
import AllPagesOfBandarbanDT from "./pages/detachments/bandarbanDetachment/AllPagesOfBandarbanDT";
import BaitulIzzat from "./pages/detachments/bandarbanDetachment/BaitulIzzat";
import Bandarban from "./pages/detachments/bandarbanDetachment/Bandarban";
import BorderGuardTrainingCenterAndCollege from "./pages/detachments/bandarbanDetachment/BorderGuardTrainingCenterAndCollege";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion-instructions" element={<DataDeletionInstructions />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/all-pages" element={<PrivateRoute><Home /></PrivateRoute>} />

        {/* Bandarban Detachment */}
        <Route path="/bandarban-detachment/all-pages-of-bandarban-dt" element={<PrivateRoute><AllPagesOfBandarbanDT /></PrivateRoute>} />
        <Route path="/bandarban-detachment/baitul-izzat" element={<PrivateRoute><BaitulIzzat /></PrivateRoute>} />
        <Route path="/bandarban-detachment/bandarban" element={<PrivateRoute><Bandarban /></PrivateRoute>} />
        <Route path="/bandarban-detachment/border-guard-training-center-and-college" element={<PrivateRoute><BorderGuardTrainingCenterAndCollege /></PrivateRoute>} />

        {/* Dhaka Detachment */}
        <Route path="/dhaka-detachment/all-pages-of-dhaka-dt" element={<PrivateRoute><AllPagesOfDhakaDT /></PrivateRoute>} />
        <Route path="/dhaka-detachment/dhaka-north" element={<PrivateRoute><DhakaNorth /></PrivateRoute>} />
        <Route path="/dhaka-detachment/dhaka-south" element={<PrivateRoute><DhakaSouth /></PrivateRoute>} />

        {/* Dynamic Page Route */}
        <Route path="/pages/:pageId" element={<PrivateRoute><Page /></PrivateRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
