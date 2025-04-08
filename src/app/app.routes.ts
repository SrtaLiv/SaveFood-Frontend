import { Routes } from '@angular/router';
import { FoodFormComponent } from './components/food-form/food-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

//Rutas
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'food-form/:id',
        component: FoodFormComponent,
        title: 'Formulario de Comidas'
    },

    {
        path: '*',
        redirectTo: '',
        pathMatch: 'full'
    }
];
