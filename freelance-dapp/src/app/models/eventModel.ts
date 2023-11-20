export class EventModel {
    timestamp: number;
    blockNumber: number;
    message: string;

    constructor(timestamp: number, blockNumber: number, message: string) {
        this.timestamp = timestamp;
        this.blockNumber = blockNumber;
        this.message = message;
    }
}
