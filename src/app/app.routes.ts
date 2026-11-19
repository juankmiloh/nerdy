import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:folder',
    loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'subject-detail',
    loadComponent: () => import('./subject-detail/subject-detail.page').then((m) => m.SubjectDetailPage),
  },
];
