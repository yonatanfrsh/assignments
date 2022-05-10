import { AssignmentType } from "./assignment-type";

export class Assignment {

    public constructor(
        public id?: number,
        public name?: string, 
        public typeId?: number,
        public repeated?: boolean,
        public startDate?: Date,
        public endDate?: Date,
        public ended?: boolean,
        public description?: string,
        public archive?: boolean) {}

    // public get assignmentType() : AssignmentType { 
    //     return new AssignmentType(1, "Personal");
    // }
}
