import { Component, OnInit } from '@angular/core';

import { FoodService } from '../../services/food.service';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AutoCompleteModule,ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  foods: any[] | undefined;

  formGroup!: FormGroup;

  filteredFoods: any[] | undefined;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
      this.foodService.getFoods().subscribe((food) => {
          this.foods = food;
      });

      this.formGroup = new FormGroup({
          selectedFood: new FormControl<object | null>(null)
      });
  }

  filterFood(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.foods as any[]).length; i++) {
          let food = (this.foods as any[])[i];
          if (food.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(food);
          }
      }

      this.filteredFoods = filtered;
  }
}
