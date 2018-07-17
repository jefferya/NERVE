/**
 * events: notifyCollectionAdd, notifyCollectionClear, notifyCollectionRemove
 * @type type
 */

AbstractModel = require("./AbstractModel");

class Collection extends AbstractModel {
    constructor(array) {
        super();
        this.delegate = this;

        this.innerArray = [];

        if (typeof array !== "undefined" & array !== null) {
            this.innerArray = Array(array.length);
            let i = array.length;
            while (i--) this.innerArray[i] = array[i];
        }
    }

    setDelegate(delegate) {
        this.delegate = delegate;
    }

    $() {
        return $(this.innerArray);
    }
    [Symbol.iterator] () {
        return this.innerArray[Symbol.iterator]();
    }
            
    add(obj) {
        let notifyarray = [];
        if (obj instanceof Array) {
            for (let o of obj) {
                if (!this.contains(o)) {
                    this.innerArray.push(o);
                    notifyarray.push(o);
                }
            }
        } else if (!this.contains(obj)) {
            this.innerArray.push(obj);
            notifyarray.push(obj);
        }
        this.delegate.notifyListeners("notifyCollectionAdd", this.clone(), notifyarray);
    }
    set(obj) {
        this.clear();
        this.add(obj);
    }
    async clear() {
        if (this.isEmpty()) return;
        let oldArray = this.innerArray;
        this.innerArray = [];
        await this.delegate.notifyListeners("notifyCollectionClear", this.clone(), oldArray);
    }
    get(i) {
        return this.innerArray[i];
    }
    getLast() {
        return this.innerArray[this.innerArray.length - 1];
    }
    getFirst() {
        return this.innerArray[0];
    }
    size() {
        return this.innerArray.length;
    }
    isEmpty() {
        return this.innerArray.length === 0;
    }
    remove(obj) {
        if (!this.contains(obj)) return null;
        this.innerArray.splice(this.innerArray.indexOf(obj), 1);
        this.delegate.notifyListeners();
        this.delegate.notifyListeners("notifyCollectionRemove", this.clone(), obj);
        return obj;
    }
    contains(obj) {
        return this.innerArray.indexOf(obj) !== -1;
    }
    
    /**
     * Create a new Collection with the contents of this collection.  Does not copy the delegate.
     * @return {nm$_Collection.Collection}
     */
    clone(){
        return new Collection(this.innerArray);
    }
}

module.exports = Collection;