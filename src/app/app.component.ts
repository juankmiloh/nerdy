import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'home' },
    { title: 'Materias', url: '/subject-detail', icon: 'book' },
    { title: 'Horario', url: '/folder/Horario', icon: 'calendar' },
    { title: 'Tareas', url: '/folder/Tareas', icon: 'clipboard' },
  ];
}
