import { Dispatch, SetStateAction } from "react";

export type ProjectCardType = {
  id:string;
   image: string;
   hoverImage: string;
  status?: string;
  location?: string;
  title: string;
  subtitle: string;
  href?: string;
  startingFrom?: string;
  units?: string;
  setActiveProject?:Dispatch<SetStateAction<string>>
};