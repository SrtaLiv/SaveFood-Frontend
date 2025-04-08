import { Injectable } from '@angular/core';
import { time } from 'console';

@Injectable()
export class MealService {
    getData() {
        return [
            { name: 'Desayuno', time: '08:00 AM'},
            { name: 'Almuerzo', time: '12:00 PM'},
            { name: 'Merienda', time: '04:00 PM'},
            { name: 'Cena', time: '08:00 PM'},
        ];
    }

    getMeals() {
        return Promise.resolve(this.getData());
    }
};