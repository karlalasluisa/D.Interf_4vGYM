import { Monitor } from "./Monitor";
import { TypeActivity } from "./TypeActivity";

export class Activity {
    id: number;
    activityType: TypeActivity;
    monitors: Monitor[];
    startDate: Date;
    endDate: Date;
    

    public constructor(id: number, Sdate: Date, Edate: Date, monitors: Monitor[], type: TypeActivity) {
        this.id = id;
        this.startDate = Sdate;
        this.endDate = Edate;
        this.monitors = monitors;
        this.activityType = type;
    }

    
}