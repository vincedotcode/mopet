import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

export const mauritiusLocations = [
  "Port Louis",
  "Curepipe",
  "Quatre Bornes",
  "Vacoas",
  "Rose Hill",
  "Flic en Flac",
  "Grand Baie",
  "Pamplemousses",
  "Mahébourg",
  "Bel Air",
  "Triolet",
  "Goodlands",
  "Moka",
  "Rivière du Rempart",
  "Beau Bassin",
  "Plaine Magnien",
  "Tamarin",
  "Albion",
  "Le Morne",
  "Mont Choisy"
];