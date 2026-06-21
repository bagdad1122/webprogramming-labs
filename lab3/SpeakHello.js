(function (window) {
  // Створюємо об'єкт, який буде доступний ззовні
  var helloSpeaker = {};
  
  // Ця змінна залишається локальною для цієї IIFE
  var speakWord = "Hello";

  // Додаємо метод до об'єкта
  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  // Експортуємо об'єкт у глобальну область видимості
  window.helloSpeaker = helloSpeaker;

})(window);
