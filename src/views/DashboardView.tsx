import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "@/api/AssetAPI";
import MapComponent from "@/components/MapComponent";


export default function DashboardView() {
  const { data=[], isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
  });

 

  if (isLoading) return <p>Cargando...</p>;
if (error) return <p>Error al cargar los activos.</p>;

  return (
    <>
      <h1 className="text-2xl font-black">Activos Registrados</h1>

      {data?.length ? (
        <>
          <MapComponent assets={data} />
        </>
      ) : (
        <p className="text-center py-28">
          No hay activos aún{" "}
          <Link to="/assets/create" className="text-fuchsia-500 font-bold">
            Crear Activo
          </Link>
        </p>
      )}
    </>
  );
}
