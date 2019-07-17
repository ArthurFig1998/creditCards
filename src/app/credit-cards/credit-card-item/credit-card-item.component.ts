import { Component, OnInit, Input } from "@angular/core";
import { CreditCard } from "../credit-card.model";

@Component({
  selector: "app-credit-card-item",
  templateUrl: "./credit-card-item.component.html",
  styleUrls: ["./credit-card-item.component.css"]
})
export class CreditCardItemComponent implements OnInit {
  @Input() creditCard: CreditCard;

  constructor() {}

  ngOnInit() {}
}
