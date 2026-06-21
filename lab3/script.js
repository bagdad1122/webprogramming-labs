(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  console.log("=== ОСНОВНЕ ЗАВДАННЯ (1.2.2) ===");
  for (var i = 0; i < names.length; i++) {
    
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  console.log("\n=== ДОДАТКОВИЙ ФУНКЦІОНАЛ (1.2.3) ===");
  console.log("Анотація: Цей алгоритм вираховує суму ASCII-кодів усіх літер імені.");
  console.log("Якщо сума парна — виводимо 'Hello', якщо непарна — виводимо 'Good Bye'.");
  console.log("--------------------------------------------------");

  for (var i = 0; i < names.length; i++) {
    var asciiSum = 0;
    
    for (var k = 0; k < names[i].length; k++) {
      asciiSum += names[i].charCodeAt(k);
    }

    if (asciiSum % 2 === 0) {
      helloSpeaker.speak(names[i] + " (Сума ASCII: " + asciiSum + " -> Парна)");
    } else {
      byeSpeaker.speak(names[i] + " (Сума ASCII: " + asciiSum + " -> Непарна)");
    }
  }

})();
