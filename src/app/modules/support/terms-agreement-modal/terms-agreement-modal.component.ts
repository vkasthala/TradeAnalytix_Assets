
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-terms-agreement-modal',
  templateUrl: './terms-agreement-modal.component.html',
  styleUrls: ['./terms-agreement-modal.component.scss']
})
export class TermsAgreementModalComponent {
  @Input() isVisible: boolean = false;
  @Input() authProvider: string = '';
  @Output() onAgree = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  agreedToTerms: boolean = false;

  closeModal() {
    this.agreedToTerms = false;
    this.onCancel.emit();
  }

  proceedWithAuth() {
    if (this.agreedToTerms) {
      this.onAgree.emit();
    }
  }
}
