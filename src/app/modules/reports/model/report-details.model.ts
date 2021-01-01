import { ReportCategory } from './report-category.enum';

export class ReportDetails {
    
    id: string;

    title: string;

    category: ReportCategory;

    constructor(id: string, title: string, category: ReportCategory){
        this.id = id;
        this.title = title;
        this.category = category;
    }

}
