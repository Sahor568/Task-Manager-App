import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { iCategory } from '../../interFace/iCategory';
import { authService } from '../../Service/auth.service';
import { LoadService } from '../../Service/load.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Button,
    Dialog,
    InputText,
    ColorPickerModule,
    ToastModule,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
  providers: [MessageService],
})
export class Categories {
  categories: iCategory[] = [];
  isEditing = false;
  editingCategoryId: number | null = null;
  visible: boolean = false;
  color: ColorPickerModule | undefined;

  private authService = inject(authService);
  private loadService = inject(LoadService);
  private messageService = inject(MessageService);

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    color: new FormControl(''),
  });

  ngOnInit(): void {
    this.categories = this.loadService.loadCategories(); // Will load categories when the component initializes
  }

  // private loadCategories(): void {
  //   const userId = this.authService.getCurrentUser();
  //   const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  //   this.categories = categories.filter((c: any) => c.userId === userId);
  // }

  showDialog(category?: iCategory) {
    this.isEditing = !!category;
    this.editingCategoryId = category ? category.id : null;
    this.categoryForm.reset({ name: category ? category.name : '' });
    this.visible = true;
  }

  onSubmit() {
    // if (this.categoryForm.invalid) return;

    // const { name, color } = this.categoryForm.value;
    const userId = this.authService.getCurrentUser();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const nextId = categories.length ? Math.max(...categories.map((c: any) => c.id)) + 1 : 1;
    if (this.isEditing && this.editingCategoryId !== null) {
      const index = categories.findIndex((c: any) => c.id === this.editingCategoryId);
      if (index !== -1) {
        // If category exists, update it
        categories[index] = { ...categories[index], ...this.categoryForm.value };
        this.showEdited();
      }
    } else {
      // If adding a new category
      const newCategory = { id: nextId, ...this.categoryForm.value, userId };
      categories.push(newCategory);
      this.showSuccess();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    this.loadService.loadCategories(); // Refresh the list after adding/updating
    this.visible = false;
  }

  editCategory(category: iCategory) {
    this.isEditing = true;
    this.editingCategoryId = category.id;
    this.categoryForm.setValue({ name: category.name, color: category.color }); // Set form values for editing
    this.visible = true;
  }

  deleteCategory(id: number): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const updatedCategories = categories.filter((c: any) => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    this.loadService.loadCategories(); // Refresh the list after deletion
    this.showDeleted();
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Category Status',
      detail: 'Category Added Successfully!',
      life: 3000,
    });
  }

  showEdited() {
    this.messageService.add({
      severity: 'info',
      summary: 'Category Status',
      detail: 'Category edited successfully!',
      life: 3000,
    });
  }

  showDeleted() {
    this.messageService.add({
      severity: 'error',
      summary: 'Alert',
      detail: 'Category deleted successfully!',
      life: 3000,
    });
  }
}
