import { Component, OnInit, OnDestroy } from "@angular/core";
import { CreditCard } from "../credit-card.model";
import { CreditCardsService } from "../credit-cards.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-credit-card-edit",
  templateUrl: "./credit-card-edit.component.html",
  styleUrls: ["./credit-card-edit.component.css"]
})
export class CreditCardEditComponent implements OnInit {
  originalCreditCard: CreditCard;
  creditCard: CreditCard = null;
  editMode: boolean = false;
  id: string;

  constructor(
    private creditCardService: CreditCardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      if (this.id === null || this.id === undefined) {
        this.editMode = false;
        return;
      }

      this.originalCreditCard = this.creditCardService.getCreditCard(this.id);
      if (!this.originalCreditCard) {
        return;
      }

      this.editMode = true;
      this.creditCard = JSON.parse(JSON.stringify(this.originalCreditCard));
    });
  }

  onSubmit(form: NgForm) {
    // this.editMode = true;
    const value = form.value;
    const newCreditCard = new CreditCard(
      value.id,
      value.name,
      value.issuer,
      value.description,
      value.url
    );

    if (this.editMode) {
      this.creditCardService.updateCreditCard(
        this.originalCreditCard,
        newCreditCard
      );
    } else {
      this.creditCardService.addCreditCard(newCreditCard);
    }
    this.editMode = false;
    this.router.navigate(["/credit-cards"], { relativeTo: this.route });
    this.creditCardService.getCreditCards();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(["/credit-cards"], { relativeTo: this.route });
  }
}
