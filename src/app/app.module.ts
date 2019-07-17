import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreditCardsComponent } from "./credit-cards/credit-cards.component";
import { CreditCardDetailComponent } from "./credit-cards/credit-card-detail/credit-card-detail.component";
import { CreditCardEditComponent } from "./credit-cards/credit-card-edit/credit-card-edit.component";
import { CreditCardItemComponent } from "./credit-cards/credit-card-item/credit-card-item.component";
import { CreditCardListComponent } from "./credit-cards/credit-card-list/credit-card-list.component";
import { HeaderComponent } from "./header.component";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardsComponent,
    CreditCardDetailComponent,
    CreditCardEditComponent,
    CreditCardItemComponent,
    CreditCardListComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
