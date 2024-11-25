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
import AddFacebookPage from "./pages/addFacebookPage/AddFacebookPage";
import Page from "./pages/Page/Page";
import DhakaDetachment from "./pages/detachments/dhakaDetachment/DhakaDetachment";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/all-pages" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dhaka-detachment" element={<PrivateRoute><DhakaDetachment /></PrivateRoute>} />

        <Route path="/pages/:pageId" element={<PrivateRoute><Page /></PrivateRoute>} />
        <Route path="/add-facebook-page" element={<PrivateRoute><AddFacebookPage /></PrivateRoute>} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion-instructions" element={<DataDeletionInstructions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
