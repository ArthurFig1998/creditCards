import { Component, OnInit, Input } from "@angular/core";
import { CreditCard } from "../credit-card.model";
import { CreditCardsService } from "../credit-cards.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-credit-card-detail",
  templateUrl: "./credit-card-detail.component.html",
  styleUrls: ["./credit-card-detail.component.css"]
})
export class CreditCardDetailComponent implements OnInit {
  @Input() creditCard: CreditCard;
  id: string;

  constructor(
    private creditCardService: CreditCardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.creditCard = this.creditCardService.getCreditCard(this.id);
    });
  }

  onDelete() {
    this.creditCardService.deleteCreditCard(this.creditCard);
    this.creditCardService.getCreditCards();
    this.router.navigate(["/credit-cards"], { relativeTo: this.route });
  }
}
