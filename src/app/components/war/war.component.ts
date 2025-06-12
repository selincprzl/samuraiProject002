import { Component, OnInit } from '@angular/core';
import { War } from 'src/app/models/War';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.css']
})
export class WarComponent implements OnInit {
  wars: War[] = []; // Array to hold war data

  // Constructor to inject GenericService instance
  constructor(private service: GenericService<War>) {}

  // Lifecycle hook called after component initialized
  ngOnInit(): void {
    // Call getWars method to fetch war data
    this.getWars();
  }

  // Method to fetch all war data
  getWars(): void {
    // Subscribe to getAll method of GenericService
    this.service.getAll('war').subscribe(data => {
      // Store fetched data in wars array
      this.wars = data;
    });
  }
}
