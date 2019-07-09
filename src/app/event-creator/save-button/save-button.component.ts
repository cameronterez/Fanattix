import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() valid

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.valid)
  }

  goToPostSave(){
    this.router.navigate(['creator/event-created'])
  }

}
