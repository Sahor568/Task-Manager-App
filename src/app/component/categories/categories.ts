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
import { ICategory } from '../../common/interface/iCategory';
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
  categories: ICategory[] = [];
  isEditing = false; // In default, we are not editing any category
  editingCategoryId: number | null  = null;
  visible: boolean = false; // In default, the dialog is not visible
  color: ColorPickerModule | undefined;

  private authService = inject(AuthService);
  private loadService = inject(LoadService);
  private toastService = inject(ToastService);

  // Form group for category input
  protected categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    color: new FormControl(''),
  });

  ngOnInit(): void {
    this.categories = this.loadService.loadCategories(); // Will load categories when the component initializes
  }

  // Function to show the dialog for adding or editing a category
  protected showDialog(category?: ICategory) {
    this.isEditing = !!category;
    this.editingCategoryId = category ? category.id : null;
    this.categoryForm.reset({ name: category ? category.name : '' });
    this.visible = true;
  }

  // Function to handle form submission for adding or editing a category
  protected onSubmit() {
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


  // Function to handle editing a category
  protected editCategory(category: ICategory) {
    this.isEditing = true;
    this.editingCategoryId = category.id;
    this.categoryForm.setValue({ name: category.name, color: category.color }); // Set form values for editing
    this.visible = true;
  }

  // Function to handle deleting a category
  protected deleteCategory(id: number): void {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const updatedCategories = categories.filter((c: any) => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    this.toastService.showToast('error', 'Alert', 'Category deleted successfully!'); // Show error toast message

    this.categories = updatedCategories;
  }
}
