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
import { iCategory } from '../../common/interface/iCategory';
import { AuthService } from '../../common/service/auth.service';
import { LoadService } from '../../common/service/load.service';
import { ToastService } from '../../common/service/toast.service';

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Button,
    Dialog,
    InputText,
    ColorPickerModule,
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
  providers: [],
})
export class Categories {
  categories: iCategory[] = [];
  isEditing = false;
  editingCategoryId: number | null = null;
  visible: boolean = false;
  color: ColorPickerModule | undefined;

  private authService = inject(AuthService);
  private loadService = inject(LoadService);
  private toastService = inject(ToastService);

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
    const userId = this.authService.getCurrentUserId();
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const nextId = categories.length ? Math.max(...categories.map((c: any) => c.id)) + 1 : 1;
    if (this.isEditing && this.editingCategoryId !== null) {
      const index = categories.findIndex((c: any) => c.id === this.editingCategoryId);
      if (index !== -1) {
        // If category exists, update it
        categories[index] = { ...categories[index], ...this.categoryForm.value };
        this.toastService.showToast('info', 'Category Status', 'Category edited successfully!');
        this.categories = categories;
      }
    } else {
      // If adding a new category
      const newCategory = { id: nextId, ...this.categoryForm.value, userId };
      categories.push(newCategory);
      this.toastService.showToast('success', 'Category Status', 'Category Added Successfully!');
      this.categories = categories;
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
    this.toastService.showToast('error', 'Alert', 'Category deleted successfully!');

    this.categories = updatedCategories;
  }
}
