import { Component, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';

export enum Meal {
  Desayuno = 'Desayuno',
  Almuerzo = 'Almuerzo',
  Merienda = 'Merienda',
  Cena = 'Cena',
  Snack = 'Snack',
}

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule,
    DropdownModule,
  ],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.scss',
})
export class FoodFormComponent {
  formFood!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;

  meals: any[] = []; // Define las comidas disponibles
  selectedMeal: any; // Esta propiedad almacenará la comida seleccionada

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,

  ) {
    this.formFood = this.fb.group({
      id: [null], //en caso de estar editando
      name: ['', Validators.required],
      meal: ['', Validators.required], // Vincula el campo del formulario al dropdown
      image: [null]
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true; // MODO EDICION
      this.getFoodById(+id!);
    }

    this.meals = Object.keys(Meal).map((key) => {
      return { label: Meal[key as keyof typeof Meal], value: key };
    });

    // Configurar el valor inicial para selectedMeal
    this.selectedMeal = this.formFood.get('meal')?.value;
  }


  onFileSelected(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
  }

  getFoodById(id: number) {
    this.foodService.getFoodById(id).subscribe({
      next: (foundFood) => {
        this.formFood.patchValue(foundFood);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado',
        });
        this.router.navigateByUrl('/');
      },
    });
  }

  createFood() {
    if (this.formFood.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revisen los campos e intente nuevamente',
      });
      return;
    }
  
    const selectedMeal = this.formFood.get('meal')?.value;
    if (!selectedMeal) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una meal e intente nuevamente',
      });
      return;
    }
  
    this.isSaveInProgress = true;
    const food = this.formFood.value;
  
    this.foodService.createFood(food, this.selectedFile!).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Comida guardada correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.message || 'Revisen los campos e intente nuevamente',
        });
      },
    });
  }
  


  changeImage(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.foodService.updateFoodImage(this.formFood.value.id, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Comida actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise el archivo seleccionado',
        });
      },
    });
  }

  updateFood() {
    if (this.formFood.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revises los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.foodService.updateFood(this.formFood.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Comida actualizada correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Reviseme los campos e intente nuevamente',
        });
      },
    });
  }

}