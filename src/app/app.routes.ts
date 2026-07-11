import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'requests/new', loadComponent: () => import('./features/request-form/request-form.component').then(m => m.RequestFormComponent) },
  { path: 'requests/:id', loadComponent: () => import('./features/request-detail/request-detail.component').then(m => m.RequestDetailComponent) },
  { path: 'requests', loadComponent: () => import('./features/request-list/request-list.component').then(m => m.RequestListComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'requests' },
  { path: '**', redirectTo: 'requests' },
];
