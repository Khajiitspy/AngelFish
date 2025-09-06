import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-dialog-modal',
  imports: [
    NgIf
  ],
  templateUrl: './dialog-modal.html',
  styleUrl: './dialog-modal.css'
})
export class DialogModal {
  @Input() title = 'Модалка';
  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  close() {
    console.log("close")
    this.closed.emit();
  }

  submit() {
    this.submitted.emit();
    this.close();
  }
}
