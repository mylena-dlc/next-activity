"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

type Activity = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  image: string;
};

const ActivityDetail = () => {
    const params = useParams(); 
    const activityId = params.activityId as string; 

    const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`/api/activity/${activityId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Erreur inconnue");
        setActivity(data);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'activité', error)
      }
    }

    fetchActivity();
  }, [activityId]);

  if (!activity) return <p>Chargement...</p>;

  return (
    <> 
        <div className="p-6 flex flex-col justify-center">
           
            <h1 className="text-2xl font-bold my-2 text-center">{activity.name}</h1>
            <Image 
                src={activity.image} 
                alt={activity.name}
                width={600} height={400} 
                className="w-full h-64 object-cover rounded" />

            <p className="mt-4 text-center">{activity.description}</p>
            <span className="my-4 text-center px-4 py-2 bg-color4 rounded-lg text-slade-700">Localisation : {activity.latitude}, {activity.longitude}</span>
        </div>
    
    </>
    
  );
};

export default ActivityDetail;
