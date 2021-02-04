export class EntertainmentActivityInput {
    entertainmentActivityId: number;
    entertainmentActivityName: string;
    entertainmentActivityDescription: string;
    entertainmentActivityPrice: number;
    maxPeopleAllowed: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}