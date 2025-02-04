interface CategoryType {
    id: string;
    nameCategory: string;

}

interface ActivityType {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: CategoryType;

}