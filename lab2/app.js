// =========================================================
// 1.2.3.
let car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 200;
car1.tuning = true;
car1["number of accidents"] = 0;

car1.driver = new Object();
car1.driver.name = "Богдан Чермак";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";


// 1.2.4.
let car2 = {
    color: "red",
    maxSpeed: 180,
    tuning: false,
    "number of accidents": 2,
    driver: {
        name: "Богдан Чермак",
        category: "B",
        "personal limitations": null
    }
};

console.log("--- Тестування 1.2.5 та 1.2.6 ---");

// 1.2.5.
car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

// 1.2.6.
car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();


// 1.2.7.
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // 1.2.9.
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let nightMsg = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log("Driver " + this.driver.name + " " + nightMsg + " and has " + this.driver.experience + " years of experience");
        }
    };
}

// 1.2.8.
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

console.log("--- Тестування 1.2.10 (Truck) ---");

// 1.2.10.
let truck1 = new Truck("white", 5000, 85.5, "Volvo", "FH16");
let truck2 = new Truck("black", 7500, 90.0, "MAN", "TGX");

truck1.AssignDriver("Богдан Чермак", true, 5);
truck2.AssignDriver("Богдан Чермак", false, 12);

truck1.trip();
truck2.trip();

// 1.2.12 - 1.2.15.
class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Квадрат — це правильний чотирикутник, у якого всі сторони рівні, а кути прямі (90 градусів).");
    }

    length() {
        console.log(`Сума довжин сторін фігури: ${4 * this.a}`);
    }

    square() {
        console.log(`Площа фігури: ${this.a * this.a}`);
    }

    info() {
        console.log(`\n--- Характеристика Квадрата ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}

// 1.2.16 - 1.2.17.
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Прямокутник — це чотирикутник, у якого всі кути прямі, а протилежні сторони попарно рівні.");
    }

    length() {
        console.log(`Сума довжин сторін фігури: ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Площа фігури: ${this.a * this.b}`);
    }

    info() {
        console.log(`\n--- Характеристика Прямокутника ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Кути: 90°, 90°, 90°, 90°`);
        this.length();
        this.square();
    }
}

// 1.2.18 - 1.2.19, 1.2.22.
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    // 1.2.22.
    get a() { return this._a; }
    set a(value) { this._a = value; }

    get alpha() { return this._alpha; }
    set alpha(value) { this._alpha = value; }

    get beta() { return this._beta; }
    set beta(value) { this._beta = value; }

    static help() {
        console.log("Ромб — це паралелограм, у якого всі сторони рівні, а протилежні кути рівні між собою.");
    }

    length() {
        console.log(`Сума довжин сторін фігури: ${4 * this.a}`);
    }

    square() {
        let rad = this.alpha * Math.PI / 180;
        console.log(`Площа фігури: ${(this.a * this.a * Math.sin(rad)).toFixed(2)}`);
    }

    info() {
        console.log(`\n--- Характеристика Ромба ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}

// 1.2.20 - 1.2.21.
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Паралелограм — це чотирикутник, у якого протилежні сторони попарно паралельні та рівні.");
    }

    length() {
        console.log(`Сума довжин сторін фігури: ${2 * (this.a + this.b)}`);
    }

    square() {
        let rad = this.alpha * Math.PI / 180;
        console.log(`Площа фігури: ${(this.a * this.b * Math.sin(rad)).toFixed(2)}`);
    }

    info() {
        console.log(`\n--- Характеристика Паралелограма ---`);
        console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}

console.log("\n=== 1.2.23. Виклик статичних методів help ===");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

console.log("\n=== 1.2.24. Створення об'єктів та виклик info ===");
let mySquare = new Square(5);
mySquare.info();

let myRectangle = new Rectangle(4, 8);
myRectangle.info();

let myRhombus = new Rhombus(6, 120, 60);
myRhombus.info();

let myParallelogram = new Parallelogram(5, 10, 135, 45);
myParallelogram.info();


// 1.2.25.
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

console.log("\n=== 1.2.26. Тестування Triangular ===");
// 1.2.26.
let tri1 = Triangular();
let tri2 = Triangular(6, 8, 10);
let tri3 = Triangular(15, 20, 25);

console.log("tri1 (за замовчуванням):", tri1);
console.log("tri2:", tri2);
console.log("tri3:", tri3);


// 1.2.27.
function PiMultiplier(number) {
    return function() {
        return Math.PI * number;
    };
}

console.log("\n=== 1.2.28. Тестування PiMultiplier ===");
// 1.2.28.
let multiplyPiBy2 = PiMultiplier(2);
let multiplyPiBy3_2 = PiMultiplier(3 / 2);
let dividePiBy2 = PiMultiplier(1 / 2);

console.log("Math.PI * 2 =", multiplyPiBy2());
console.log("Math.PI * (3/2) =", multiplyPiBy3_2());
console.log("Math.PI / 2 =", dividePiBy2());


// 1.2.29.
function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Колір: ${color}, Тип: ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

// 1.2.30.
let PaintBlue = Painter("blue");
let PaintRed = Painter("red");
let PaintYellow = Painter("yellow");

console.log("\n=== 1.2.31. Тестування Painter ===");

let obj1 = { 
    maxSpeed: 280, 
    type: "Sportcar", 
    color: "magenta" 
};

let obj2 = { 
    type: "Truck", 
    "avg speed": 90, 
    "load capacity": 2400 
};

let obj3 = { 
    maxSpeed: 180, 
    color: "purple", 
    isCar: true 
};

console.log("--- Тестування Об'єкта 1 ---");
PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

console.log("--- Тестування Об'єкта 2 ---");
PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

console.log("--- Тестування Об'єкта 3 (без властивості type) ---");
PaintBlue(obj3);
PaintRed(obj3);
PaintYellow(obj3);
