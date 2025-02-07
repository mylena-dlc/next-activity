"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


type Activity = {
    id: string;
    name: string;
    categoryId: string
  };
  
  type Category = {
    id: string;
    nameCategory: string;
    activities?: Activity[],
  };


const Card: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await fetch("/api/category");
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur inconnue");
    
            setCategories(data);
    
          } catch (error) {
            console.error('Erreur lors du chargement des activités', error)
          }
        }
    
        fetchCategories();
      }, []);
    
      return (
        <div className="p-6">    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-color4 shadow-lg rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl uppercase font-bold mb-3 text-center">{category.nameCategory}</h2>
                <ul className="list-disc list-inside ">
                {category.activities && category.activities.length > 0 ? (
                    category.activities.map((activity) => (
                      <li key={activity.id} className="py-1">
                      <Link href={`/activity/${activity.id}`} className="">
                        {activity.name}
                      </Link>
                    </li>                    
                  ))
                ) : (
                  <p className=" italic">Aucune activité disponible</p>
                )}
                </ul>

                <button
                  className=" bg-color1 hover:bg-color2 text-white rounded-xl flex items-center justify-center text-sm py-2 px-4 my-4 transition"
                  onClick={() => router.push(`/activity/add/?categoryId=${category.id}`)}
                >
                  + Ajouter une activité
                </button>

              </div>
            ))}
          </div>
        </div>
      );
    };

export default Card
