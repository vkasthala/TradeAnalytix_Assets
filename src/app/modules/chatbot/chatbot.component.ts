import { Component } from '@angular/core';

interface Message {
  text: string;
  isFromUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  chatOpen = false;
  inputMessage = '';
  messages: Message[] = [];

  sendMessage() {
    if (!this.inputMessage.trim()) return;

    this.messages.push({ text: this.inputMessage, isFromUser: true });
    this.inputMessage = '';
    this.processUserMessage();
  }

  processUserMessage() {
    setTimeout(() => {
      this.messages.push({ text: 'This is a simulated response.', isFromUser: false });
    }, 1000);
  }

  startDragging(event: MouseEvent) {
    const element = event.target as HTMLElement;
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(pageX: number, pageY: number) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };

    element.ondragstart = function() {
      return false;
    };
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }
}