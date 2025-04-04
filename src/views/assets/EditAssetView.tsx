import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssetById } from "@/api/AssetAPI";
import EditAssetForm from "@/components/assets/EditAssetForm";

export default function EditAssetView() {

    const params = useParams();

    const assetId = params.assetId!

    const { data, isLoading, isError } = useQuery({
      queryKey: ["editAssets", assetId],
      queryFn: () => getAssetById(assetId),
      retry: false
    });

    if(isLoading) return "Cargando...";
    if(isError) return <Navigate to='/404' />

    if(data) return <EditAssetForm data={data}  assetId={assetId} />;
}