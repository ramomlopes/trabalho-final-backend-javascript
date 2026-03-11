class Observer {

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(dados) {
        this.observers.forEach(observer => observer.update(dados));
    }
}

module.exports = Observer;