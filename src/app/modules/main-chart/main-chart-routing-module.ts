import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainChartComponent } from './main-chart.component';

const routes: Routes = [{
    path: '',
    component: MainChartComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainChartRoutingModule { }

