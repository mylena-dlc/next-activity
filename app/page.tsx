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
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Catégories</h1>
      {/* <ul>
        {categories.map((category) => (
          <li key={category.id} className="p-2 border-b">
            {category.nameCategory}
          </li>
        ))}
      </ul> */}

<Card />

      <form onSubmit={handleAddCategory} className="mt-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nouvelle catégorie"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
          Ajouter
        </button>
      </form>
      
    </div>
   
  );
}
