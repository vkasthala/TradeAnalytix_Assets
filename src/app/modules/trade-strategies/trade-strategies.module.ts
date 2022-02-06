import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceEditorComponent } from './components/bulk-update-ui/source-editor/source-editor.component';
import { TechnicalIndicatorEditorComponent } from './components/bulk-update-ui/technical-indicator-editor/technical-indicator-editor.component';
import { MindsetEditorComponent } from './components/bulk-update-ui/mindset-editor/mindset-editor.component';
import { EventEditorComponent } from './components/bulk-update-ui/event-editor/event-editor.component';
import { CloseSourceEditorComponent } from './components/bulk-update-ui/close-source-editor/close-source-editor.component';
import { CloseEventEditorComponent } from './components/bulk-update-ui/close-event-editor/close-event-editor.component';
import { DirectionEditorComponent } from './components/bulk-update-ui/direction-editor/direction-editor.component';
import { ContrarianEditorComponent } from './components/bulk-update-ui/contrarian-editor/contrarian-editor.component';
import { PlannedEditorComponent } from './components/bulk-update-ui/planned-editor/planned-editor.component';

@NgModule({
  declarations: [SourceEditorComponent, TechnicalIndicatorEditorComponent, MindsetEditorComponent, EventEditorComponent, CloseSourceEditorComponent, CloseEventEditorComponent, DirectionEditorComponent, ContrarianEditorComponent, PlannedEditorComponent],
  imports: [
    CommonModule
  ]
})
export class TradeStrategiesModule { }
