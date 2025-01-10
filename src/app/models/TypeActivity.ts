export class TypeActivity {
    id: number;
    name: string;
    monitors: number;
    constructor(id: number, name: string, numOfMonitors: number) {
        this.id = id;
        this.name = name;
        this.monitors = numOfMonitors;
    }
}