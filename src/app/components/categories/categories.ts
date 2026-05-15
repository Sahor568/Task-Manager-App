import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categories: Category[] = [
    { id: 1, name: 'Design', color: '#e5e7eb' },
    { id: 2, name: 'Development', color: '#f3f4f6' },
    { id: 3, name: 'Testing', color: '#f9fafb' },
  ];

  showAddModal = false;
  showEditModal = false;

  newCategory: Category = { id: 0, name: '', color: '#e5e7eb' };
  editingCategory: Category = { id: 0, name: '', color: '#e5e7eb' };

  openAddModal() {
    this.newCategory = { id: 0, name: '', color: '#e5e7eb' };
    this.showAddModal = true;
  }

  openEditModal(category: Category) {
    this.editingCategory = { ...category };
    this.showEditModal = true;
  }

  closeModals() {
    this.showAddModal = false;
    this.showEditModal = false;
  }

  addCategory() {
    if (this.newCategory.name.trim()) {
      const newId = this.categories.length + 1;
      this.categories.push({ ...this.newCategory, id: newId });
      this.closeModals();
    }
  }

  updateCategory() {
    const index = this.categories.findIndex((c) => c.id === this.editingCategory.id);
    if (index !== -1) {
      this.categories[index] = { ...this.editingCategory };
    }
    this.closeModals();
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter((c) => c.id !== category.id);
  }
}
