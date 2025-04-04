import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AssetFormData } from "types";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type AssetFormProps = {
    register: UseFormRegister<AssetFormData>;
    errors: FieldErrors<AssetFormData>;
    setValue: UseFormSetValue<AssetFormData>;
    watch: UseFormWatch<AssetFormData>;
};

export default function AssetForm({ errors, register, setValue, watch }: AssetFormProps) {
    const icons = ["motor.png", "pozo.png", "transformador.png"];
    const selectedIcon = watch("icon");

    // Get URL parameters
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // Set default values for lat and lng if they exist in URL
    useEffect(() => {
        if (lat && lng) {
            setValue("latitude", parseFloat(lat), { shouldValidate: true });
            setValue("longitude", parseFloat(lng), { shouldValidate: true });
        }
    }, [lat, lng, setValue]);

    return (
        <>
            {/* Asset Name */}
            <div className="mb-5 space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">Asset Name</label>
                <input
                    id="name"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Asset Name"
                    {...register("name", { required: "Asset name is required" })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            {/* Comments */}
            <div className="mb-5 space-y-3">
                <label htmlFor="comments" className="text-sm uppercase font-bold">Comments</label>
                <textarea
                    id="comments"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Asset Comments"
                    {...register("comments", { required: "Comments are required" })}
                />
                {errors.comments && <ErrorMessage>{errors.comments.message}</ErrorMessage>}
            </div>

            {/* Latitude */}
            <div className="mb-5 space-y-3">
                <label htmlFor="latitude" className="text-sm uppercase font-bold">Latitude</label>
                <input
                    id="latitude"
                    className="w-full p-3 border border-gray-200"
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    {...register("latitude", { required: "Latitude is required" })}
                />
                {errors.latitude && <ErrorMessage>{errors.latitude.message}</ErrorMessage>}
            </div>

            {/* Longitude */}
            <div className="mb-5 space-y-3">
                <label htmlFor="longitude" className="text-sm uppercase font-bold">Longitude</label>
                <input
                    id="longitude"
                    className="w-full p-3 border border-gray-200"
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    {...register("longitude", { required: "Longitude is required" })}
                />
                {errors.longitude && <ErrorMessage>{errors.longitude.message}</ErrorMessage>}
            </div>

            {/* Created Date */}
            <div className="mb-5 space-y-3">
                <label htmlFor="created_at" className="text-sm uppercase font-bold">Created</label>
                <input
                    id="created_at"
                    className="w-full p-3 border border-gray-200"
                    type="date"
                    {...register("created_at", { required: "Date is required" })}
                />
                {errors.created_at && <ErrorMessage>{errors.created_at.message}</ErrorMessage>}
            </div>

            {/* Icon Selection */}
            <div className="mb-5 space-y-3">
                <label className="text-sm uppercase font-bold">Icon</label>
                <div className="grid grid-cols-3 gap-4">
                    {icons.map((icon) => (
                        <div
                            key={icon}
                            className={`p-2 border rounded cursor-pointer ${
                                selectedIcon === icon ? "border-blue-500" : "border-gray-300"
                            }`}
                            onClick={() => setValue("icon", icon, { shouldValidate: true })}
                        >
                            <img src={`/${icon}`} alt={icon} className="w-12 h-12 mx-auto" />
                        </div>
                    ))}
                </div>
                {errors.icon && <ErrorMessage>{errors.icon.message}</ErrorMessage>}
            </div>
        </>
    );
}
