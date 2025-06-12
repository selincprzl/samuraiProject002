import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { War } from 'src/app/models/War';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // Array to store the list of wars
  public warList: War[] = [];
  
  // Boolean flag to indicate whether editing mode is active
  public isEditing: boolean = false;
  
  // Variable to hold the war being edited
  public editedWar: War | null = null;

  // Form group for creating a new war
  warForm: FormGroup = new FormGroup({
    warName: new FormControl('', Validators.required),
    deathCount: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  // Form group for editing an existing war
  editForm: FormGroup = this.formBuilder.group({
    warName: ['', Validators.required],
    deathCount: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    private service: GenericService<War>, // Service for API calls related to wars
    private formBuilder: FormBuilder // FormBuilder for creating form groups
  ) {}

  ngOnInit(): void {
    // Fetch all wars when the component initializes
    this.getAll();
  }

  // Fetch all wars from the server
  getAll(): void {
    this.service.getAll('war').subscribe(data => {
      this.warList = data;
    });
  }

  // Create a new war
  create(): void {
    if (this.warForm.valid) {
      const warData = { ...this.warForm.value };

      // Call the service to create a new war
      this.service.create(warData, 'war').subscribe({
        next: (data) => {
          this.getAll(); // Refresh the war list
          this.warForm.reset(); // Reset the form
        },
        error: (error) => {
          console.error('Error creating war:', error);
        }
      });
    } else {
      console.log('Form is invalid. Cannot create war.');
    }
  }

  // Delete a war by its ID
  deleteWar(id: number | undefined): void {
    if (id !== undefined) {
      // Call the service to delete the war
      this.service.delete('war', id).subscribe(result => {
        if (result) {
          console.log(`War with ID ${id} deleted successfully.`);
          this.getAll(); // Refresh the war list
        } else {
          console.error(`Failed to delete War with ID ${id}.`);
        }
      });
    } else {
      console.error('Cannot delete. War ID is undefined.');
    }
  }

  // Activate editing mode for a war
  editWar(war: War): void {
    this.isEditing = true;
    this.editedWar = war;
    // Set the values of the edit form to the current war's properties
    this.editForm.setValue({
      warName: war.warName,
      deathCount: war.deathCount,
      location: war.location
    });
  }

  // Cancel editing mode
  cancelEdit(): void {
    this.isEditing = false;
    this.editedWar = null;
    this.editForm.reset(); // Reset the edit form
  }

  // Update an existing war
  updateWar(): void {
    if (this.editForm.valid && this.editedWar) {
      const updatedWar: War = { ...this.editedWar, ...this.editForm.value };
      // Call the service to update the war
      this.service.update(updatedWar, 'war', updatedWar.warId).subscribe(data => {
        console.log('War updated successfully:', data);
        this.getAll(); // Refresh the war list
        this.cancelEdit(); // Exit editing mode
      }, error => {
        console.error('Error updating war:', error);
      });
    } else {
      console.error('Form is invalid or edited war is null.');
    }
  }
} 
