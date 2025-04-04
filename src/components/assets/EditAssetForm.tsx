import { Link, useNavigate } from "react-router-dom";
import AssetForm from "./AssetForm";
import { Asset, AssetFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAsset, updateAsset } from "@/api/AssetAPI";
import { toast } from "react-toastify";

type EditAssetFormProps = {
  data: AssetFormData;
  assetId: Asset["_id"];
};

export default function EditAssetForm({ data, assetId }: EditAssetFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateAsset,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["editAssets", assetId] });
      toast.success(data);
      navigate("/");
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteAsset,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["editAssets", assetId] });
      toast.success("Activo eliminado");
        navigate("/");
      
    },
  });

  const handleForm = (formData: AssetFormData) => {
    const data = {
      formData,
      assetId,
    };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Activo</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Completa el formulario para editar el activo
        </p>

        <nav className="my-5">
          <Link
            className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <AssetForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          {/* ✅ Validación de icono en la interfaz */}
          {errors.icon && (
            <p className="text-red-500 text-sm">{errors.icon.message}</p>
          )}

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />

          <nav className="my-5 bg-center">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white uppercase text-xl font-bold cursor-pointer transition-colors"
              onClick={() => mutateDelete(assetId)}
            >
              Eliminar
            </button>
          </nav>
        </form>
      </div>
    </>
  );
}
