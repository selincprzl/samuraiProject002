import { Component } from '@angular/core';
import { Weapon } from 'src/app/models/Weapon';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent {
  weaponList: Weapon[] = []; // Array to store all weapons

  constructor(private service: GenericService<Weapon>) {}

  ngOnInit(): void {
    // Fetch all weapons when the component initializes
    this.getAll();
  }

  // Method to fetch all weapons from the database
  getAll(): void {
    this.service.getAll('Weapon').subscribe(data => {
      // Map through the data to add image URLs for each weapon
      this.weaponList = data.map(weapon => ({
        ...weapon,
        img: this.getImageUrlForWeapon(weapon.weaponName)
      }));
      console.log(data); // Log raw data
      console.log(this.weaponList); // Log processed weapon list with image URLs
    });
  }

  // Method to generate an image URL based on the weapon's name
  getImageUrlForWeapon(weaponName: string): string {
    // Create an image URL by formatting the weapon's name
    const imgUrl = `assets/img/${weaponName.replace(/\s+/g, '').toLowerCase()}.jpg`;
    console.log(`Image URL for ${weaponName}: ${imgUrl}`); // Log the generated URL
    return imgUrl;
  }
}
