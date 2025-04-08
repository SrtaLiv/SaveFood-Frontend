import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { SearchComponent } from "../search/search.component";
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'SaveFood',
                command: () => {
                    this.router.navigate(['/']);
                }
            },
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/']);
                }
                // items: [
                //     {
                //         label: 'Installation',
                //         route: '/installation'
                //     },
                //     {
                //         label: 'Configuration',
                //         route: '/configuration'
                //     }
                // ]
            },
            {
                label: 'Favoritas',
                icon: 'pi pi-link',
                command: () => {
                    this.router.navigate(['/favoritas']);
                }
            },
            {
                label: 'Recetas',
                icon: 'pi pi-palette',
            }
        ];
    }
}