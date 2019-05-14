import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-post-purchase',
  templateUrl: './post-purchase.component.html',
  styleUrls: ['./post-purchase.component.css']
})
export class PostPurchaseComponent implements OnInit {
  email = this.auth.user.email

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
