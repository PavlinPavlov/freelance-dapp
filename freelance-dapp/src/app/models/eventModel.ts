export class EventModel {
    type: string;
    timestamp: number;
    blockNumber: number;
    message: string;

    constructor(type: string, timestamp: number, blockNumber: number, message: string) {
        this.type = type;
        this.timestamp = timestamp;
        this.blockNumber = blockNumber;
        this.message = message;
    }
}
