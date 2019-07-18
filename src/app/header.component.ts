import { Component, OnInit } from "@angular/core";
import { CreditCardsService } from "./credit-cards/credit-cards.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private creditCardService: CreditCardsService,
    private http: HttpClient
  ) {}

  onSaveData() {
    this.http
      .put(
        "http://localhost:3000/creditCards",
        this.creditCardService.getCreditCards()
      )
      .subscribe(response => {
        console.log(response);
      });
    this.creditCardService.getCreditCards();
  }

  onFecthData() {
    this.creditCardService.getCreditCards();
  }

  ngOnInit() {}
}
