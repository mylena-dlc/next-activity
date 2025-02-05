"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Activity = {
    id: string;
    name: string;
    categoryId: string
  };
  
  type Category = {
    id: string;
    nameCategory: string;
  };


const Card: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activities, setActivities] = useState<Record<string, Activity[]>>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await fetch("/api/category");
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur inconnue");
    
            setCategories(data);
    
            // Charger les activités pour chaque catégorie
            data.forEach(async (category: Category) => {
              const activityResponse = await fetch(`/api/activity?categoryId=${category.id}`);
              const activityData = await activityResponse.json();
              setActivities((prev) => ({ ...prev, [category.id]: activityData }));
            });
    
          } catch (err) {
            setError((err as Error).message);
          }
        }
    
        fetchCategories();
      }, []);
    
      return (
        <div className="p-6">    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">{category.nameCategory}</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {category.activities.length ? (
                    category.activities.map((activity) => (
                      <li key={activity.id} className="py-1">{activity.name}</li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic">Aucune activité disponible</li>
                  )}
                </ul>

                {/* Bouton + pour ajouter une activité */}
                <button
                  className=" bg-blue-500  w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-blue-700 transition"
                  onClick={() => router.push(`/activity/add/?categoryId=${category.id}`)}
                >
                  +
                </button>

              </div>
            ))}
          </div>
        </div>
      );
    };

export default Card
