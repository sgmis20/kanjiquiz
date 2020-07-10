function hideKoreanLyrics() {
  const koreanLyrics = document.getElementsByClassName('koreanLyrics');
  console.log(koreanLyrics.length);
  let i;
  for (i = 0; i < koreanLyrics.length; i++) {
    koreanLyrics[i].style.display = 'none';
  }
}
hideKoreanLyrics();

document
  .querySelector('.toggleDisplayLyrics')
  .addEventListener('click', function() {
    const koreanLyrics = document.getElementsByClassName('koreanLyrics');
    console.log(koreanLyrics.length);
    let i;
    for (i = 0; i < koreanLyrics.length; i++) {
      if (koreanLyrics[i].style.display === 'none') {
        koreanLyrics[i].style.display = 'block';
      } else {
        koreanLyrics[i].style.display = 'none';
      }
    }
  });
