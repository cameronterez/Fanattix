import { Component, OnInit} from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-category-scroll',
  templateUrl: './category-scroll.component.html',
  styleUrls: ['./category-scroll.component.css']
})
export class CategoryScrollComponent implements OnInit {
  categories

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }

}
