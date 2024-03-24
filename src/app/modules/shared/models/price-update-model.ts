export class PriceUpdateModel {

    price: number | undefined;

    ltp: number | undefined;

    symbol: string | undefined;

    change: number | undefined;

    changePercent: number | undefined;

    winFlag: boolean | undefined;

    updateChangeProps() {
        if (!this.price) {
            return;
        }
        if (!this.ltp) {
            this.ltp = this.price;
        }
        this.change = parseFloat((this.price - this.ltp).toFixed(3));
        this.changePercent = parseFloat(((this.change / this.ltp) * 100).toFixed(2));
        this.winFlag = (this.change >= 0);
    }

}