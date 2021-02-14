import { Component, OnInit, ViewChild } from '@angular/core';
import { EditableListComponent } from 'src/app/modules/shared/components/widgets/editable-list/editable-list.component';
import { DataSetupService } from '../../services/data-setup.service';

@Component({
  selector: 'app-datasetup',
  templateUrl: './datasetup.component.html',
  styleUrls: ['./datasetup.component.scss']
})
export class DatasetupComponent implements OnInit {

  @ViewChild('mindSetType', { static: false }) protected mindSetType: EditableListComponent;

  constructor(private dataSetupService: DataSetupService) { }

  ngOnInit() {
    this.dataSetupService.getMindsetTypes().subscribe(result => {
      this.mindSetType.items = result;
    });
  }

}
