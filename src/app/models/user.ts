import { Food } from "./food";
import { Image } from "./image";

export interface User {
    id: number;
    username: string;
    email: string;
    image?: Image;
    comidas?: Food[];
}