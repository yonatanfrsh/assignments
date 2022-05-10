import { pipe } from "rxjs";
import { AssignmentType } from "./assignment-type";

export class AssignmentModelView {

    public constructor(
        public id?: number,
        public name?: string, 
        public assignmentType?: AssignmentType,
        public repeated?: boolean,
        public startDate?: Date,
        public endDate?: Date,
        public ended?: boolean,
        public description?: string,
        public archive?: boolean) {}
}
