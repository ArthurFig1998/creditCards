import { Component, OnInit, OnDestroy } from "@angular/core";
import { CreditCard } from "../credit-card.model";
import { Subscription } from "rxjs";
import { CreditCardsService } from "../credit-cards.service";

@Component({
  selector: "app-credit-card-list",
  templateUrl: "./credit-card-list.component.html",
  styleUrls: ["./credit-card-list.component.css"]
})
export class CreditCardListComponent implements OnInit, OnDestroy {
  creditCards: CreditCard[];
  private subscription: Subscription;

  constructor(private crediCardService: CreditCardsService) {
    this.crediCardService.getCreditCards();
  }

  ngOnInit() {
    this.subscription = this.crediCardService.creditCardChangeEvent.subscribe(
      (creditCardsList: CreditCard[]) => {
        this.creditCards = creditCardsList;
      }
    );
    this.crediCardService.getCreditCards();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
