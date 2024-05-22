import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { SamuraiImages } from '../../models/SamuraiImages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  // Array to store the image URLs for the front page, [] allows you to store multiple images.
  imageUrls: SamuraiImages[] = [];

  constructor(private service: GenericService<SamuraiImages>, private router: Router) {}

  ngOnInit(): void {
    // Fetch image URLs when the component initializes
    this.getImageUrls();
  }

  //makes the HTTP request and 
  //updates the prop. with new data
  getImageUrls(): void {
    this.service.getAll('frontpage').subscribe(data => {
      this.imageUrls = data;
    });
  }

  // Method to navigate to a specific page
  navigateToPage(page: string): void {
    this.router.navigate(['/' + page]);
  }
}
