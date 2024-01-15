import { EventEmitter } from "@angular/core";

export class DynamicFieldDto {

    id: number;

    name: string;

    displayName: string;

    type: string;

    category: string;

    label: string;

    tooltip: string;

    userFieldId: number;
    
    show: string;

    customValueSupported: boolean;

    value: any;

    changeEvent: EventEmitter<any>;

}
