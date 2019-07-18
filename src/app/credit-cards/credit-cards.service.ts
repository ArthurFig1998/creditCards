import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { CreditCard } from "./credit-card.model";
import { Subject } from "rxjs";
import { Params } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CreditCardsService implements OnInit {
  creditCardChangeEvent = new Subject<CreditCard[]>();
  creditCardSelectedEvent = new EventEmitter<CreditCard[]>();

  private creditCards: CreditCard[];
  maxCreditCardId: number;
  currentId: number;
  newCreditCardId: number;

  constructor(private http: HttpClient) {
    this.getCreditCards();
  }

  getCreditCards() {
    this.http
      .get<{ message: string; creditCards: CreditCard[] }>(
        "http://localhost:3000/creditCards/"
      )
      .subscribe(
        (response: any) => {
          this.creditCards = response.creditCards;
          this.creditCardChangeEvent.next(this.creditCards.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCreditCard(id: string) {
    for (let i = 0; i < this.creditCards.length; i++) {
      if (this.creditCards[i].id === id) {
        return this.creditCards[i];
      }
    }
    return null;
  }

  addCreditCard(newCreditCard: CreditCard) {
    if (!newCreditCard) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newCreditCard.id = "";

    this.http
      .post<{ message: string; creditCard: CreditCard }>(
        "http://localhost:3000/creditCards/",
        newCreditCard,
        {
          headers: headers
        }
      )
      .subscribe(responseData => {
        this.creditCards.push(responseData.creditCard);
        this.creditCardChangeEvent.next(this.creditCards);
      });
  }

  updateCreditCard(originalCreditCard: CreditCard, newCreditCard: CreditCard) {
    if (!originalCreditCard || !newCreditCard) {
      return;
    }

    const pos = this.creditCards.findIndex(d => d.id === originalCreditCard.id);
    if (pos < 0) {
      return;
    }

    newCreditCard.id = originalCreditCard.id;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    this.http
      .put(
        "http://localhost:3000/creditCards/" + originalCreditCard.id,
        newCreditCard,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.creditCards[pos] = newCreditCard;
        this.creditCardChangeEvent.next(this.creditCards);
      });
  }

  deleteCreditCard(creditCard: CreditCard) {
    if (!creditCard) {
      return;
    }

    const pos = this.creditCards.findIndex(d => d.id === creditCard.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete("http://localhost:3000/creditCards/" + creditCard.id)
      .subscribe((response: Response) => {
        this.creditCards.splice(pos, 1);
        this.creditCardChangeEvent.next(this.creditCards.slice());
      });
  }

  ngOnInit() {
    this.getCreditCards();
    console.log("credit-cards service ngOnInit is being called");
  }
}
