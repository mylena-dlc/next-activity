"use client";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  nameCategory: string;
};

export default function Home() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  
  useEffect(() => {
    async function fetchCategories() {
      
        const response = await fetch("/api/category");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erreur inconnue");
        }

        setCategories(data);
    
    }

    fetchCategories();
  }, []);

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameCategory: newCategory }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'ajout de la catégorie");
      }

      setCategories([...categories, data]); // Ajouter la nouvelle catégorie à la liste
      setNewCategory(""); // Réinitialiser le champ
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  }

  return (
    <div>
      <Navbar />
      <Card />
      <div className="bg-color1 p-6">
        <h2 className="uppercase text-white text-center font-bold">ajouter une catégorie</h2>
        <form onSubmit={handleAddCategory} className="mt-4 flex justify-center">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nouvelle catégorie"
                  className="border p-2 rounded-xl"
                />
                <button type="submit" className="bg-color5 text-gray-700 p-2 ml-2 rounded-xl">
                  Ajouter
                </button>
              </form>
      </div>
      
    </div>
   
  );
}
