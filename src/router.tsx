import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "@/views/DashboardView";
import AppLayout from "@/layouts/AppLayout";
import CreateAssetView from "./views/assets/CreateAssetView";
import EditAssetView from "./views/assets/EditAssetView";
import AuthLayout from "./layouts/AuthLayout";

import RegisterView from "./views/auth/RegisterView";

import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import LoginView from "./views/auth/LoginView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";



export default function Router (){

    return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/assets/create" element={<CreateAssetView />} index />
            <Route
              path="/assets/:assetId/edit"
              element={<EditAssetView />}
              index
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/register" element={<RegisterView />} />
            <Route
              path="/auth/confirm-account"
              element={<ConfirmAccountView />}
            />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPasswordView />}
            />
            <Route
              path="/auth/new-password"
              element={<NewPasswordView />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}