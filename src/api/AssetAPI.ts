import api from "@/lib/axios";
import { Asset, AssetFormData, dashboardAssetSchema } from "@/types/index";
import { isAxiosError } from "axios";

// Function to create a new asset
export async function createAsset(formData: AssetFormData) {
  try {
    const { data } = await api.post('/assets', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Function to get all assets
export async function getAssets() {
  try {
    const { data } = await api("/assets");
    const response = dashboardAssetSchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      console.error("Validation error in getAssets:", response.error);
      return []; // 🔹 If validation fails, return an empty array
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("API error:", error.response.data.error);
    } else {
      console.error("Unknown error in getAssets:", error);
    }
    return []; // 🔹 If there is an error, return an empty array
  }
}

// Function to get an asset by ID
export async function getAssetById(id: Asset['_id']) {
  try {
    const { data } = await api(`/assets/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Type definition for asset update function
type AssetAPIType = {
  formData: AssetFormData;
  assetId: Asset['_id'];
};

// Function to update an existing asset
export async function updateAsset({ formData, assetId }: AssetAPIType) {
  try {
    const { data } = await api.put<string>(`/assets/${assetId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Function to delete an asset by ID
export async function deleteAsset(id: Asset["_id"]) {
  try {
    const { data } = await api.delete<string>(`/assets/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
