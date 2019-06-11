import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Albums } from "./../../models/albums/albums";
import { AlbumsService } from "src/app/services/albums/albums.service";

@Component({
  selector: "app-albums",
  templateUrl: "albums.component.html",
  styleUrls: ["./albums.component.css"]
})
export class AlbumsComponent implements OnInit {
  public albums: Albums[] = [];
  closeResult: string;
  editingElement: number;
  element: HTMLElement;

  constructor(
    private phrasesService: AlbumsService,

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
    this.phrasesService.getAlbums().subscribe(response => {
      this.albums = response;
    });
  }

  createAlbums(title: string) {
    if (title === "") {
      alert("EMPTY");
      return;
    }
    let album: Albums;
    album = {
      id: Date.now(),
      title: title
    };
    this.phrasesService.addAlbums(album).subscribe(response => {
      this.albums.push(album);
    });
  }

  deleteAlbums(phrase: Albums) {
    this.phrasesService.deletePhrases(phrase).subscribe(response => {
      this.albums = this.albums.filter(h => h !== phrase);
    });
  }

  updateAlbums(title: string) {
    console.log(this.editingElement);
    if (title === "") {
      alert("EMPTY");
      return;
    }
    let album: Albums;
    album = {
      id: this.editingElement,
      title: title
    };
    this.phrasesService.updateAlbums(album).subscribe(() =>
      this.albums.forEach(element => {
        if (element.id == this.editingElement) {
          element.title = album.title;
        }
      })
    );
  }
}
