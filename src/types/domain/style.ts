export type ServingStyleType = "simple" | "grand" | "deluxe";

export interface ServingStyle {
  name: string;
  nameEn: string;
  description: string;
  features: {
    plate: string;
    napkin: string;
    wineGlass: string;
    extras?: string[];
  };
  additionalPrice: number;
  image: string;
}

