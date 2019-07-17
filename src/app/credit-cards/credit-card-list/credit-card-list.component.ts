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
  creditCards: CreditCard[] = [
    {
      id: "1",
      name: "Chase Freedom",
      description: "5X Rotation Categories",
      issuer: "Chase",
      url: "./assets/freedom_card_image.png"
    }
  ];
  private subscription: Subscription;

  constructor(private crediCardService: CreditCardsService) {}

  ngOnInit() {
    this.subscription = this.crediCardService.creditCardChangeEvent.subscribe(
      (creditCardsList: CreditCard[]) => {
        this.creditCards = creditCardsList;
      }
    );
    console.log(this.creditCards);
    this.crediCardService.getCreditCards();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
