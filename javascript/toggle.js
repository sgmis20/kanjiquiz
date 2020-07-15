document.querySelector('.btn1').addEventListener('click', function(e) {
  [].map.call(document.querySelectorAll('.yomigana, .kor'), function(el) {
    el.classList.toggle('toggled');
  });
});

document.querySelector('.btn2').addEventListener('click', function(e) {
  [].map.call(document.querySelectorAll('.yomigana'), function(el) {
    el.classList.toggle('toggled');
  });
});

document.querySelector('.btn3').addEventListener('click', function(e) {
  [].map.call(document.querySelectorAll('.kor'), function(el) {
    el.classList.toggle('toggled');
  });
});

document.querySelector('.btn4').addEventListener('click', function(e) {
  [].map.call(
    document.querySelectorAll('.title, .kanji, .kanjiyomi, .tango'),
    function(el) {
      el.classList.toggle('kanjitoggled');
    }
  );
});

// $('a[href*=#]').click(function(event) {
//   $('html, body').animate(
//     {
//       scrollTop: $($.attr(this, 'href')).offset().top,
//     },
//     500
//   );
//   event.preventDefault();
// });
