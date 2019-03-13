export class Card {
    private _name: string;
    private _suit: string;
    private _shown: boolean;

    constructor(name: string, suit: string) {
        this._name = name;
        this._suit = suit;
        this._shown = true;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter suit
     * @return {string}
     */
    public get suit(): string {
        return this._suit;
    }

    /**
     * Getter shown
     * @return {boolean}
     */
    public get shown(): boolean {
        return this._shown;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter suit
     * @param {string} value
     */
    public set suit(value: string) {
        this._suit = value;
    }

    /**
     * Setter shown
     * @param {boolean} value
     */
    public set shown(value: boolean) {
        this._shown = value;
    }


    public flip(): void {
        this._shown = !this._shown;
    }
}