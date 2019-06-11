import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { PhrasesService } from "../../services/phrases/phrases.service";
import { Phrases } from "../../models/phrases/phrases";

@Component({
  selector: "app-phrases",
  templateUrl: "./phrases.component.html",
  styleUrls: ["./phrases.component.css"]
})
export class PhrasesComponent implements OnInit {
  public phrases: Phrases[] = [];
  closeResult: string;
  editingElement: number;
  element: HTMLElement;

  constructor(
    private phrasesService: PhrasesService,
    private modalService: NgbModal
  ) {}

  open(content, id) {
    this.editingElement = id;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.phrasesService.getPhrases().subscribe(response => {
      this.phrases = response;
    });
  }

  createPhrase(title: string, body: string) {
    if (title === "" || body === "") {
      alert("EMPTY");
      return;
    }
    let phrase: Phrases;
    phrase = {
      id: Date.now(),
      title: title,
      body: body
    };
    this.phrasesService.addPhrases(phrase).subscribe(response => {
      this.phrases.push(phrase);
    });
  }

  deletePhrases(phrase: Phrases) {
    this.phrasesService.deletePhrases(phrase).subscribe(response => {
      this.phrases = this.phrases.filter(h => h !== phrase);
    });
  }

  updatePhrases(title: string, body: string) {
    if (title === "" || body === "") {
      alert("EMPTY");
      return;
    }
    let phrase: Phrases;
    phrase = {
      id: this.editingElement,
      title: title,
      body: body
    };
    this.phrasesService.updatePhrases(phrase).subscribe(() =>
      this.phrases.forEach(element => {
        if (element.id == this.editingElement) {
          element.title = phrase.title;
          element.body = phrase.body;
        }
      })
    );
  }
}
