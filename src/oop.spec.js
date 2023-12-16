const assert = require('assert');
const core = require('./oop');

describe('ООП', () => {
    describe('#Point', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y', () => {
            const point = new core.Point(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
        });

        it('Точка создается без параметров, x и y принимают нули как значение по умолчанию', () => {
            const point = new core.Point();

            assert.strictEqual(point.x, 0);
            assert.strictEqual(point.y, 0);
        });

        it('Точка создается с одним параметром, x принимает значение, y принимают нуль как значение по умолчанию', () => {
            const point = new core.Point(1);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 0);
        });
    });

    describe('#Point3D', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y, z принимает нуль как значение по умолчанию', () => {
            const point = new core.Point3D(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
            assert.strictEqual(point.z, 0);
        });

        it('Точка создается с тремя параметрами, которые становятся x, y, z', () => {
            const point = new core.Point3D(1, 2.5, -3);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2.5);
            assert.strictEqual(point.z, -3);
        });

        it('Point3D имеет статический метод vectorLength', () => {
            const pointA = new core.Point3D(1, 2, -3);
            const pointB = new core.Point3D(1, -1, 1);

            assert.strictEqual(typeof core.Point3D.vectorLength, 'function');

            const length = core.Point3D.vectorLength(pointA, pointB);

            assert.strictEqual(length, 5);
        });
    });

    describe('#Queue', () => {
        it('может создаться из массива', () => {
            const queue = new core.Queue([1, 2, 3, 5]);

            assert.strictEqual(queue instanceof core.Queue, true);
        });
        it('может создаться без аргументов', () => {
            const queue = new core.Queue();

            assert.strictEqual(queue instanceof core.Queue, true);
        });
        it('метод pop работает', () => {
            const queue = new core.Queue([1, 2, 3, 4, 5, 6]);

            assert.strictEqual((queue.pop() === 1) && (JSON.stringify(queue.que) === JSON.stringify([2, 3, 4, 5, 6])), true);
        });
        it('метод push работает', () => {
            const queue = new core.Queue([1, 2, 3, 4, 5]);
            queue.pushBack(6);

            assert.strictEqual((JSON.stringify(queue.que) === JSON.stringify([1, 2, 3, 4, 5, 6])), true);
        });
    });
});