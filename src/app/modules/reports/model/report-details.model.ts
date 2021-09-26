import { ReportCategory } from './report-category.enum';

export class ReportDetails {
    
    id: string;

    title: string;

    category: ReportCategory;

    description: string;

    url: string;


    constructor(id: string, title: string, category: ReportCategory, description:string){
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
    }

}
