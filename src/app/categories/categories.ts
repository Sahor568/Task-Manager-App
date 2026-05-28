import { Component } from '@angular/core';
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

interface Category {
  id: number;
  name: string;
  color: string;
  userId: number;
}

@Component({
  selector: 'app-categories',
  imports: [FormsModule, ReactiveFormsModule, Button, Dialog, InputText, ColorPickerModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categories: Category[] = [];
  isEditing = false;
  editingCategoryId: number | null = null;
  visible: boolean = false;
  color: ColorPickerModule | undefined;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    color: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadCategories(); // Will load categories when the component initializes
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }

  private loadCategories(): void {
    const userId = this.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.categories = categories.filter((c: any) => c.userId === userId);
  }

  showDialog(category?: Category) {
    this.isEditing = !!category;
    this.editingCategoryId = category ? category.id : null;
    this.categoryForm.reset({ name: category ? category.name : '' });
    this.visible = true;
  }

  onSubmit() {
    // if (this.categoryForm.invalid) return;

    // const { name, color } = this.categoryForm.value;
    const userId = this.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const nextId = categories.length ? Math.max(...categories.map((c: any) => c.id)) + 1 : 1;
    if (this.isEditing && this.editingCategoryId !== null) {
      const index = categories.findIndex((c: any) => c.id === this.editingCategoryId);
      if (index !== -1) {
        // If category exists, update it
        categories[index] = { ...categories[index], ...this.categoryForm.value };
      }
    } else {
      // If adding a new category
      const newCategory = { id: nextId, ...this.categoryForm.value, userId };
      categories.push(newCategory);
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    this.loadCategories(); // Refresh the list after adding/updating
    this.visible = false;
  }

  EditCategory(category: Category) {
    this.isEditing = true;
    this.editingCategoryId = category.id;
    this.categoryForm.setValue({ name: category.name, color: category.color }); // Set form values for editing
    this.visible = true;
  }

  deleteCategory(id: number): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const updatedCategories = categories.filter((c: any) => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    this.loadCategories(); // Refresh the list after deletion
  }
}
