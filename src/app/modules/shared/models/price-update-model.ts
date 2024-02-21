export class PriceUpdateModel {

    price: number | undefined;

    close: number | undefined;

    change: number | undefined;

    changePercent: number | undefined;

    winFlag: boolean | undefined;

    updateChangeProps() {
        if (!this.price) {
            return;
        }
        if (!this.close) {
            this.close = this.price;
        }
        this.change = parseFloat((this.price - this.close).toFixed(3));
        this.changePercent = parseFloat(((this.change / this.close) * 100).toFixed(2));
        this.winFlag = (this.change >= 0);
    }

}