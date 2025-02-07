"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";

const AddActivity = () => {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <AddActivityContent />
    </Suspense>
  );
};

const AddActivityContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          image,
          categoryId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erreur lors de l'ajout");

      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <> 
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Ajouter une activité</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom de l'activité"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <button type="submit"className=" bg-color1 hover:bg-color2 text-white rounded-xl flex items-center justify-center text-sm py-2 px-4 my-4 transition"
          >
            Ajouter
          </button>
        </form>
      </div>
      </>
  );
};

export default AddActivityContent;
