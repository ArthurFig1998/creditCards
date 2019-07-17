import { Component, OnInit } from "@angular/core";
import { CreditCardsService } from "./credit-cards.service";
import { CreditCard } from "./credit-card.model";

@Component({
  selector: "app-credit-cards",
  templateUrl: "./credit-cards.component.html",
  styleUrls: ["./credit-cards.component.css"]
})
export class CreditCardsComponent implements OnInit {
  selectedCreditCard: CreditCard;

  constructor(private creditCardService: CreditCardsService) {
    this.creditCardService.getCreditCards();
  }

  ngOnInit() {
    this.creditCardService.creditCardSelectedEvent.subscribe(
      (creditCard: CreditCard) => {
        this.selectedCreditCard = creditCard;
      }
    );
    this.creditCardService.getCreditCards();
  }
}
