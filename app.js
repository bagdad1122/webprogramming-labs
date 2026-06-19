function triangle(val1, type1, val2, type2) {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: Неправильно вказано тип елемента. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    if (typeof val1 !== 'number' || typeof val2 !== 'number' || val1 <= 0 || val2 <= 0) {
        const errorMsg = "Помилка: Значення сторін та кутів повинні бути додатними числами, більшими за нуль.";
        console.log(errorMsg);
        return errorMsg;
    }

    let a, b, c, alpha, beta;

    const toRad = (deg) => deg * Math.PI / 180;
    const toDeg = (rad) => rad * 180 / Math.PI;

    const isPair = (tA, tB) => (type1 === tA && type2 === tB) || (type1 === tB && type2 === tA);
    const getVal = (type) => type1 === type ? val1 : val2;

    if (isPair("leg", "leg")) {
        a = val1; 
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } else if (isPair("leg", "hypotenuse")) {
        let leg = getVal("leg");
        c = getVal("hypotenuse");
        
        if (leg >= c) {
            const errorMsg = "Помилка: Катет не може бути більшим або дорівнювати гіпотенузі.";
            console.log(errorMsg);
            return errorMsg;
        }
        
        a = leg;
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } else if (isPair("leg", "opposite angle")) {
        a = getVal("leg");
        alpha = getVal("opposite angle");
        
        if (alpha >= 90) {
            const errorMsg = "Помилка: Гострий кут повинен бути меншим за 90 градусів.";
            console.log(errorMsg);
            return errorMsg;
        }
        
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    } else if (isPair("leg", "adjacent angle")) {
        a = getVal("leg");
        beta = getVal("adjacent angle"); 
        
        if (beta >= 90) {
            const errorMsg = "Помилка: Гострий кут повинен бути меншим за 90 градусів.";
            console.log(errorMsg);
            return errorMsg;
        }
        
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
        alpha = 90 - beta;
    } else if (isPair("hypotenuse", "angle")) {
        c = getVal("hypotenuse");
        alpha = getVal("angle");
        
        if (alpha >= 90) {
            const errorMsg = "Помилка: Гострий кут повинен бути меншим за 90 градусів.";
            console.log(errorMsg);
            return errorMsg;
        }
        
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
        beta = 90 - alpha;
    } else {
        console.log("Помилка: Несумісна пара типів. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    console.log("--- Результати обчислень ---");
    console.log(`a (катет) = ${a.toFixed(4)}`);
    console.log(`b (катет) = ${b.toFixed(4)}`);
    console.log(`c (гіпотенуза) = ${c.toFixed(4)}`);
    console.log(`alpha (кут навпроти a) = ${alpha.toFixed(4)}°`);
    console.log(`beta (кут навпроти b)  = ${beta.toFixed(4)}°`);
    console.log("----------------------------");

    return "success";
}
