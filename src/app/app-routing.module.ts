import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreditCardsComponent } from "./credit-cards/credit-cards.component";
import { CreditCardEditComponent } from "./credit-cards/credit-card-edit/credit-card-edit.component";
import { CreditCardDetailComponent } from "./credit-cards/credit-card-detail/credit-card-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/credit-cards", pathMatch: "full" },
  {
    path: "credit-cards",
    component: CreditCardsComponent,
    children: [
      { path: "new", component: CreditCardEditComponent },
      { path: ":id", component: CreditCardDetailComponent },
      { path: ":id/edit", component: CreditCardEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
