// 퀴즈 카드 공통 동작: 카드 클릭으로 개별 정답 보기, 버튼으로 전체 토글
// kanjiquizDemo.html 과 Flask 퀴즈 결과 페이지에서 함께 사용

function attachCardReveal(container) {
  [].forEach.call(container.querySelectorAll('.quizCard'), function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('revealed');
    });
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('revealed');
      }
    });
  });
}

function toggleAllCards(container, btn) {
  const cards = container.querySelectorAll('.quizCard');
  const hasHidden = container.querySelector('.quizCard:not(.revealed)') !== null;
  [].forEach.call(cards, function(card) {
    card.classList.toggle('revealed', hasHidden);
  });
  if (btn) {
    btn.textContent = hasHidden ? '정답 가리기' : '정답 확인';
  }
}
