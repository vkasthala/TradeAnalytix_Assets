import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceEditorComponent } from '../bulk-update/source-editor/source-editor.component';
import { TechnicalIndicatorEditorComponent } from '../bulk-update/technical-indicator-editor/technical-indicator-editor.component';
import { MindsetEditorComponent } from '../bulk-update/mindset-editor/mindset-editor.component';
import { EventEditorComponent } from '../bulk-update/event-editor/event-editor.component';
import { CloseSourceEditorComponent } from '../bulk-update/close-source-editor/close-source-editor.component';
import { CloseEventEditorComponent } from '../bulk-update/close-event-editor/close-event-editor.component';
import { DirectionEditorComponent } from '../bulk-update/direction-editor/direction-editor.component';
import { ContrarianEditorComponent } from '../bulk-update/contrarian-editor/contrarian-editor.component';
import { PlannedEditorComponent } from '../bulk-update/planned-editor/planned-editor.component';

@NgModule({
  declarations: [SourceEditorComponent, TechnicalIndicatorEditorComponent, MindsetEditorComponent, EventEditorComponent, CloseSourceEditorComponent, CloseEventEditorComponent, DirectionEditorComponent, ContrarianEditorComponent, PlannedEditorComponent],
  imports: [
    CommonModule
  ]
})
export class TradeStrategiesModule { }
