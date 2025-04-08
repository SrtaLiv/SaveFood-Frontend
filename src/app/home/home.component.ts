import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, AutoCompleteModule, TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  mealTypes: string[] = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];
  foodFilter: Food[] = [];
  foods: Food[] = [];
  isDeleteInProgress: boolean = false;

  constructor(
    private foodService: FoodService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllFoods();
  }

  getAllFoods() {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
    });
  }

  deleteFood(id: number) {
    this.isDeleteInProgress = true;
    this.foodService.removeFood(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Comida eliminada',
        });
        this.isDeleteInProgress = false;
        this.getAllFoods();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la comida',
        });
      },
    });
  }

  updateFood(food: Food) {
    console.log("actualizando..")
    this.foodService.updateFood(food).subscribe(() => {
      this.getAllFoods();
    })
  }

  updateFoodImage(id: number, image: File) {
    console.log("actualizando imagen..")
    this.foodService.updateFoodImage(id, image).subscribe(() => {
    }
    )
  }

  completeMethod(event: { query: string }) {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data.filter((food) => {
        return food.name.toLowerCase().includes(event.query.toLowerCase())
      });
    })
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog: any = document.querySelector("dialog");
    dialog.style.animationDuration = `${enterAnimationDuration}, ${exitAnimationDuration}`;
    dialog.showModal();
  }

  closeDialog(): void {
    const dialog: any = document.querySelector("dialog");
    dialog.close();
  }


}
