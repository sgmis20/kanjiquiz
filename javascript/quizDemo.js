// 한자퀴즈 데모: kanjiData.js 의 KANJI_DATA 를 이용해 DB 없이 퀴즈 생성
// 의존: kanjiData.js, quizCards.js (먼저 로드)

const formSection = document.getElementById('formSection');
const quizSection = document.getElementById('quizSection');
const pageSelector = document.getElementById('pageSelector');
const cardGrid = document.getElementById('cardGrid');
const quizInfo = document.getElementById('quizInfo');
const btnAnswer = document.getElementById('btnAnswer');

// 날짜 선택 옵션을 데이터에서 생성 (월별 optgroup)
function buildPageOptions() {
  const keys = Object.keys(KANJI_DATA).sort();
  let total = 0;
  keys.forEach(function(key) {
    total += KANJI_DATA[key].words.length;
  });

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = '전체 (' + total + '단어, 랜덤)';
  pageSelector.appendChild(allOption);

  const groups = {};
  keys.forEach(function(key) {
    const month = parseInt(key.slice(0, 2), 10);
    if (!groups[month]) {
      groups[month] = document.createElement('optgroup');
      groups[month].label = '~·~·~ ' + month + '월 ~·~·~';
      pageSelector.appendChild(groups[month]);
    }
    const entry = KANJI_DATA[key];
    const option = document.createElement('option');
    option.value = key;
    option.textContent =
      entry.label + ' (' + entry.pages + '페이지) [' + entry.words.length + '단어]';
    groups[month].appendChild(option);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function buildPool(pageKey) {
  if (pageKey === 'all') {
    let pool = [];
    Object.keys(KANJI_DATA).forEach(function(key) {
      pool = pool.concat(KANJI_DATA[key].words);
    });
    return { pool: pool, label: '전체 데이터 (랜덤)' };
  }
  const entry = KANJI_DATA[pageKey];
  return {
    pool: entry.words.slice(),
    label: entry.label + '  /  ' + entry.pages + '페이지',
  };
}

function startQuiz() {
  const pageKey = pageSelector.value;
  let numQ = parseInt(document.getElementById('numSelector').value, 10);

  const built = buildPool(pageKey);
  shuffle(built.pool);
  if (numQ > built.pool.length) {
    numQ = built.pool.length;
  }
  const selected = built.pool.slice(0, numQ);

  quizInfo.textContent = built.label + ' · ' + selected.length + '문제';
  cardGrid.innerHTML = '';

  selected.forEach(function(word, i) {
    const card = document.createElement('div');
    card.className = 'quizCard';

    const qNum = document.createElement('div');
    qNum.className = 'qNum';
    qNum.textContent = 'Q' + (i + 1);

    const kor = document.createElement('div');
    kor.className = 'kor';
    kor.textContent = word.kor;

    const tango = document.createElement('div');
    tango.className = 'tango';
    tango.textContent = word.tango;

    const yomigana = document.createElement('div');
    yomigana.className = 'yomigana';
    yomigana.textContent = word.yomigana;

    card.appendChild(qNum);
    card.appendChild(kor);
    card.appendChild(tango);
    card.appendChild(yomigana);
    cardGrid.appendChild(card);
  });

  attachCardReveal(cardGrid);
  btnAnswer.textContent = '정답 확인';

  formSection.hidden = true;
  quizSection.hidden = false;
  window.scrollTo(0, 0);
}

function resetQuiz() {
  quizSection.hidden = true;
  formSection.hidden = false;
}

buildPageOptions();
document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('retryBtn').addEventListener('click', resetQuiz);
btnAnswer.addEventListener('click', function() {
  toggleAllCards(cardGrid, btnAnswer);
});
