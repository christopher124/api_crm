import { Outlet } from "react-router-dom";

export function IniciarSesion() {
  return (
    <div>
      <h1>Desde IniciarSesion</h1>

      <Outlet />
    </div>
  );
}
