/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    show() {
        console.log("X = " + this.x, "Y = " + this.y, "Z = " + this.z);
    }

    static vectorLength(a, b) {
        let xx = a.x - b.x;
        let yy = a.y - b.y;
        let zz = a.z - b.z;

        return Math.sqrt(xx * xx + yy * yy + zz * zz);
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */
class Queue {
    constructor(arr) {
        this.que = [];

        if (arguments.length === 0) {
            return
        }
        for (let elem of arr) {
            this.que.push(elem);
        }
    }

    show() {
        console.log(this.que);
    }

    pushBack(elem) {
        this.que.push(elem);
    }

    pop() {
        if (this.que.length === 0) {
            return new Error('Очередь пуста!');
        }
        let result = this.que[0];
        this.que.splice(0, 1);
        return result;
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};