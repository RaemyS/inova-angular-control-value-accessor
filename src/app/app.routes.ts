import { Routes } from '@angular/router';
import {MySuperFancyEditorComponent} from "./ausgangslage/my-super-fancy-editor/my-super-fancy-editor.component";
import {
  MySuperFancyEditorFinalComponent
} from "./finalisiert/my-super-fancy-editor/my-super-fancy-editor-final.component";

export const routes: Routes = [
  { path: 'ausgangslage', component: MySuperFancyEditorComponent},
  { path: 'finalisiert', component: MySuperFancyEditorFinalComponent},
  { path: '', redirectTo: '/ausgangslage', pathMatch: 'full' },
];
