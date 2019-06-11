import { Component, OnInit} from '@angular/core';
import { EventService } from '../../event.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-category-scroll',
  templateUrl: './category-scroll.component.html',
  styleUrls: ['./category-scroll.component.css']
})
export class CategoryScrollComponent implements OnInit {
  categories

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }

  categoryClicked(id){
    this.router.navigate(['/category-events', id])
  }

}
