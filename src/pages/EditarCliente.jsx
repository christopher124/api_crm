import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formulario } from "../components/Formulario";

export function EditarCliente() {
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
  return (
    <>
      <button
        onClick={() => navigate(`/clientes`)}
        type="button"
        className="bg-blue-600 hover:bg-blue-700 block w-30 text-white p-2 uppercase font-bold text-xs mt-3"
      >
        Regresar
      </button>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">Utiliza Este formulario para editar clientes</p>
      {cliente.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Cliente ID no Valido</p>
      )}
    </>
  );
}
