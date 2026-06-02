import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  public showToast(severity:'info'|'success'|'error', summary: string, detail: string): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  }

}
