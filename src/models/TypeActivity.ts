export class TypeActivity {
    id: number;
    name: string;
    numberMonitors: number;
    
    constructor(id: number, name: string, numOfMonitors: number) {
        this.id = id;
        this.name = name;
        this.numberMonitors = numOfMonitors;
    }
}