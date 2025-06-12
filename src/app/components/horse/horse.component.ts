import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/models/Horse';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {
  // Array to store the list of horses
  horseList: Horse[] = [];

  constructor(private service: GenericService<Horse>) {}

  ngOnInit(): void {
    // Fetch all horses when the component initializes
    this.getAll();
  }

  // Method to fetch all horses from the database
  getAll(): void {
    this.service.getAll('Horse').subscribe(data => {
      // Map through the data to add image URLs for each horse
      this.horseList = data.map(horse => ({
        ...horse,
        imageUrl: this.getImageUrlForHorse(horse.horseName)
      }));
      console.log(data); // Log raw data
      console.log(this.horseList); // Log processed horse list with image URLs
    });
  }

  // Method to generate an image URL based on the horse's name
  getImageUrlForHorse(horseName: string): string {
    // Create an image URL by formatting the horse's name
    const imageUrl = `assets/img/${horseName.replace(/\s+/g, '').toLowerCase()}.jpg`;
    console.log(`Image URL for ${horseName}: ${imageUrl}`); // Log the generated URL
    return imageUrl;
  }
}
