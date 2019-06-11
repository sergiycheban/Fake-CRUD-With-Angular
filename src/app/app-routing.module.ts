import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { PhrasesComponent } from "./components/phrases/phrases.component";
import { AlbumsComponent } from "./components/albums/albums.component";

const routes: Routes = [
  { path: "", component: PhrasesComponent },
  { path: "albums", component: AlbumsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
