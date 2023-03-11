import { Routes, Route, Navigate } from "react-router-dom";

import { CheckingAuth } from "./CheckingAuth";
import {
  ConfirmedAccount,
  ConfirmEmailPage,
  ForgotPasswordPage,
  LoginPage,
  MyFavoritesPage,
  MyRecetasPage,
  RecetaFormPage,
  RecetaListPage,
  RecetaPage,
  RecetaUploadImages,
  RegisterPage,
  ResetPasswordPage,
  SettingsPage,
  SupportPage,
  UserProfilePage,
} from "../pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { RecetaLayout } from "../layouts";
import { Dashboard, UserData, DataTables } from "../pages/admin";

export const AppRouter = () => {
  const { checkAuthToken, status, user, onLoadUser } = useAuthStore();

  useEffect(() => {
    let ignore = false;

    if (ignore) return;

    checkAuthToken();

    if (status === "authenticated" && !user) {
      onLoadUser();
    }

    return () => (ignore = true);
  }, [checkAuthToken, status, onLoadUser, user]);

  //TODO Crear loading personalizado
  if (status === "checking") {
    return (
      <RecetaLayout>
        <h1>Loading...</h1>
      </RecetaLayout>
    );
  }

  //const tempStatus2 = "authenticated";
  return (
    <Routes>
      {/* ---- privated routes ---- */}

      <Route
        path="/"
        element={
          <CheckingAuth status={status}>
            <RecetaListPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/receta/create"
        element={
          <CheckingAuth status={status}>
            <RecetaFormPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/receta/upload"
        element={
          <CheckingAuth status={status}>
            <RecetaUploadImages />
          </CheckingAuth>
        }
      />
      <Route
        path="/receta/edit"
        element={
          <CheckingAuth status={status}>
            <RecetaFormPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/receta/:recetaId"
        element={
          <CheckingAuth status={status}>
            <RecetaPage />
          </CheckingAuth>
        }
      />
      {/* TODO: CAMBIAR RecetaPage */}
      <Route
        path="/user/:username/profile"
        element={
          <CheckingAuth status={status}>
            <UserProfilePage />
          </CheckingAuth>
        }
      />
      <Route
        path="/user/myProfile"
        element={
          <CheckingAuth status={status}>
            <UserProfilePage />
          </CheckingAuth>
        }
      />
      <Route
        path="/myRecetas"
        element={
          <CheckingAuth status={status}>
            <MyRecetasPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/myFavorites"
        element={
          <CheckingAuth status={status}>
            <MyFavoritesPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/user/settings"
        element={
          <CheckingAuth status={status}>
            <SettingsPage />
          </CheckingAuth>
        }
      />
      <Route
        path="/support"
        element={
          <CheckingAuth status={status}>
            <SupportPage />
          </CheckingAuth>
        }
      />

      {/** TODO: VERIFICAR QUE SEAN ADMINS PARA ENTRAR EN ESTAS Rutas */}
      <Route
        path="/admin/dashboard"
        element={
          <CheckingAuth status={status}>
            <Dashboard />
          </CheckingAuth>
        }
      />
      <Route
        path="/admin/tables"
        element={
          <CheckingAuth status={status}>
            <DataTables />
          </CheckingAuth>
        }
      />
      <Route
        path="/admin/user-data"
        element={
          <CheckingAuth status={status}>
            <UserData />
          </CheckingAuth>
        }
      />

      <Route path="/auth/confirmEmail" element={<ConfirmEmailPage />} />
      <Route path="/auth/confirmedAccount" element={<ConfirmedAccount />} />

      {/* public routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
