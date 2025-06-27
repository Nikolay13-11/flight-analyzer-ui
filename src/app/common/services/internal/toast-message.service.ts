import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../../../main/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  messageService = inject(MessageService);

  show(severity: ToastSeverity, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
