import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
export function VerCliente() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 2000);
    };
    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No Hay Resultados</p>
  ) : (
    <div>
      <button
        onClick={() => navigate(`/clientes`)}
        type="button"
        className="bg-blue-600 hover:bg-blue-700 block w-30 text-white p-2 uppercase font-bold text-xs mt-3"
      >
        Regresar
      </button>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-3">Información del Cliente</p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">ID: </span>
        {cliente.id}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Nombre: </span>
        {cliente.nombre}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Correo: </span>
        {cliente.email}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Telefono: </span>
        {cliente.telefono}
      </p>
      <p className="text-2xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa: </span>
        {cliente.empresa}
      </p>
      {cliente.notas && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
}
