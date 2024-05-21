import { Component } from '@angular/core';
import { Samurai } from 'src/app/models/Samurai';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-samurai',
  templateUrl: './samurai.component.html',
  styleUrls: ['./samurai.component.css']
})
export class SamuraiComponent {
  samuraiList: Samurai[] = []; // Array to store all samurais
  filteredSamuraiList: Samurai[] = []; // Array to store filtered samurais
  searchTerm: string = ''; // Variable to store search term

  constructor(private service: GenericService<Samurai>) {}

  ngOnInit(): void {
    // Fetch all samurais when the component initializes
    this.getAll();
  }

  // Method to fetch all samurais from the database
  getAll(): void {
    this.service.getAll('samurai').subscribe(data => {
      // Assign the fetched data to samuraiList
      this.samuraiList = data;
      // Apply filter initially
      this.applySearchFilter();
    });
  }

  // Method to apply search filter to samuraiList
  applySearchFilter(): void {
    this.filteredSamuraiList = this.samuraiList.filter(samurai =>
      // Filter samurais whose name contains the search term (case-insensitive)
      samurai.samuraiName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
