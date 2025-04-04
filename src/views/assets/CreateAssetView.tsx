import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AssetForm from "@/components/assets/AssetForm";
import { AssetFormData } from "@/types/index";
import { createAsset } from "@/api/AssetAPI";

export default function CreateAssetView() {
    const navigate = useNavigate();

    const initialValues: AssetFormData = {
        name: "",
        comments: "",
        latitude: 0,
        longitude: 0,
        icon: "",  // Aseguramos que el icono comienza vacío
        created_at: new Date().toString(),
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: initialValues,
        mode: "onSubmit",  // Validar cuando el usuario intente enviar
    });

    const mutation = useMutation({
        mutationFn: createAsset,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Activo registrado correctamente");
            navigate("/");
        },
    });

    const handleForm = (formData: AssetFormData) => {
        if (!formData.icon) {  // 
            toast.error("Debes seleccionar un icono antes de continuar.");
            return;
        }
        mutation.mutate(formData);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Registrar Activo</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Completa el formulario para registrar el activo
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

                  
                    {errors.icon && (
                        <p className="text-red-500 text-sm">{errors.icon.message}</p>
                    )}

                    <input
                        type="submit"
                        value="Registrar Activo"
                        className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
