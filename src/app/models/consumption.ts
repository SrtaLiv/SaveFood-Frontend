import { Food } from "./food";

export interface Consumption{
    food_id: Food;
    meal: Meal;
    localdate: Date;
}

export enum Meal {
    BREAKFAST = 'Desayuno',
    LUNCH = 'Almuerzo',
    SNACK = 'Merienda',
    DINNER = 'Cena'
}