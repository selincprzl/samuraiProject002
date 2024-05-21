import { Component, Input } from '@angular/core';
import { Clan } from 'src/app/models/Clan';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.component.html',
  styleUrls: ['./clan.component.css']
})
export class ClanComponent {

  clanImages: Clan[] = [];
  selectedClan: Clan | null = null;

  // Connection to the generic service(where our main methods are)
  constructor(private service: GenericService<Clan>) {}

  ngOnInit(): void {
    this.getClanImages();
  }

  // Method to retrieve all the clans from the database
  getClanImages(): void {
    this.service.getAll('clan').subscribe(data => {
      this.clanImages = data;
    });
  }

  // Method to select a clan and display its description
  selectClan(clan: Clan): void {
    this.selectedClan = clan;
  }

  // Method to close the clan description when X button is pressed
  closeDescription(): void {
    this.selectedClan = null;
  }
}
