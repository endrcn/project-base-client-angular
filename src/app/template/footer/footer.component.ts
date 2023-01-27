import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: any;

  constructor(private globals: Globals) {
    this.version = this.globals.version;
  }

  ngOnInit(): void {
  }

}
