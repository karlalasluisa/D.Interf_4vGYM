import { Monitor } from "./Monitor";
import { TypeActivity } from "./TypeActivity";
export class Actividad {
    id: number;
    date: Date;
    place: string;
    monitor: Monitor;
    type: TypeActivity;

    public constructor(id: number, date: Date, place: string, monitor: Monitor, type: TypeActivity) {
        this.id = id;
        this.date = date;
        this.place = place;
        this.monitor = monitor;
        this.type = type;
    }
}