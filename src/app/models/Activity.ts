import { Monitor } from "./Monitor";

export class Actividad {
    id: number;
    date: Date;
    place: string;
    monitor: Monitor;
    type: string;

    public constructor(id: number, date: Date, place: string, monitor: Monitor, type: string) {
        this.id = id;
        this.date = date;
        this.place = place;
        this.monitor = monitor;
        this.type = type;
    }
}