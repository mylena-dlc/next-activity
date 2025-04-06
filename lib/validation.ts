import { z } from "zod";

// Schéma de validation pour l'ajout d'une catégorie
export const categorySchema = z.object({
  // nameCategory: z.string().min(3, "Le nom de la catégorie doit contenir au moins 3 caractères").max(60),
  nameCategory: z.string().min(5, { message: "Le nom de la catégorie doit contenir au moins 3 caractères" }),
});

// Schéma de validation pour l'ajout d'une activité
export const activitySchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères").max(100),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères").max(500),
  latitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Latitude invalide"),
  longitude: z.string().regex(/^-?\d+(\.\d+)?$/, "Longitude invalide"),
  image: z.string().url("L'image doit être une URL valide"),
  categoryId: z.string().uuid("L'ID de la catégorie doit être un UUID valide"),
});


