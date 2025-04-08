import { Image } from "./image";
import { User } from "./user";

export interface Food {
    id: number;
    name: string;
    meal: string;
    image?: Image;
    usuario?: User;
}