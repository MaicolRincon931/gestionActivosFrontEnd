import { z } from 'zod'

// auth user schema
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(), // Validate email format
  password: z.string(),
  password_confirmation: z.string(),
  role: z.string(),
  token: z.string()
});

// Type for authentication
type Auth = z.infer<typeof authSchema>

// Define user schema based on authSchema
export const userSchema = authSchema.pick({
  name: true,
  email: true,
  role: true
}).extend({
  _id: z.string() // Include _id for database purposes
})

export type User = z.infer<typeof userSchema>;

// Form types for authentication-related operations
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "password" | "password_confirmation" | "name" | "role">;

export type ForgotPasswordForm = Pick<Auth, "email">

export type ConfirmToken = Pick<Auth, "token">;

export type NewPasswordForm = Pick<
  Auth,
   "password" | "password_confirmation"
>;

// Define asset schema
export const assetSchema = z.object({
  _id: z.string(),
  name: z.string(),
  comments: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  created_at: z.string(), // Store date as a string
  icon: z.string(),
})

// Dashboard-specific asset schema (subset of full assetSchema)
export const dashboardAssetSchema = z.array(
  assetSchema.pick({
    _id: true,
    name: true,
    comments: true,
    latitude: true,
    longitude: true,
    created_at: true,
    icon: true
  })
)

// Type for a full asset object
export type Asset = z.infer<typeof assetSchema>

// Type for asset form data when creating or updating an asset
export type AssetFormData = Pick<Asset, 'comments' | 'name' | 'latitude' | 'longitude' | 'created_at' | 'icon'>
