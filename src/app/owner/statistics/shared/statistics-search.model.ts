export class StatisticsSearchObj {
    dateFrom?: Date;
    dateTo?: Date;
    placeId?: number;

    resetFields(): void {
        this.dateFrom = null;
        this.dateTo = null;
        this.placeId = null;
    }
}