const init = {
  monList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayList: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth() {
    const d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth() {
    const d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: num => (num < 10 ? `0${num}` : num),
  activeDTag: null,
  getIndex(node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
      index++;
    }
    return index;
  },
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.btn-cal.next');
const $btnPrev = document.querySelector('.btn-cal.prev');

/**
 * @param {number} date
 * @param {number} dayIn
 */
function loadDate(date, dayIn) {
  document.querySelector('.cal-date').textContent = date;
  document.querySelector('.cal-day').textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM(fullDate) {
  const yy = fullDate.getFullYear();
  const mm = fullDate.getMonth();
  const firstDay = init.getFirstDay(yy, mm);
  const lastDay = init.getLastDay(yy, mm);
  let markToday; // for marking today date

  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  document.querySelector('.cal-month').textContent = `${init.monList[mm]}月`;
  document.querySelector('.cal-year').textContent = `${yy}年`;

  let trtd = '';
  let startCount;
  let countDay = 0;
  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += '<td>';
      } else {
        const fullDate = `${yy}.${init.addZero(mm + 1)}.${init.addZero(
          countDay + 1
        )}`;
        trtd += '<td class="day';
        trtd += markToday && markToday === countDay + 1 ? ' today" ' : '"';
        trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
      }
      trtd += startCount ? ++countDay : '';
      if (countDay === lastDay.getDate()) {
        startCount = 0;
      }
      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  $calBody.innerHTML = trtd;
}

/**
 * @param {string} val
 */
function createNewList(val) {
  const id = `${new Date().getTime()}`;
  const yy = init.activeDate.getFullYear();
  const mm = init.activeDate.getMonth() + 1;
  const dd = init.activeDate.getDate();
  const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

  const date = `${yy}.${init.addZero(mm)}.${init.addZero(dd)}`;

  const eventData = {};
  eventData.date = date;
  eventData.memo = val;
  eventData.complete = false;
  eventData.id = id;
  init.event.push(eventData);
  /* $todoList.appendChild(createLi(id, val, date)); */
}

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

let dateFourDigit = '';
$calBody.addEventListener('click', e => {
  if (e.target.classList.contains('day')) {
    if (init.activeDTag) {
      init.activeDTag.classList.remove('day-active');
    }
    const selectedMonth = document.getElementById('selectedMonth').textContent;
    const monthNum = selectedMonth.replace('月', '');
    const day = Number(e.target.textContent);
    if (monthNum < 10) {
      if (day < 10) {
        dateFourDigit = `0${monthNum}0${day}`;
      } else {
        dateFourDigit = `0${monthNum}${day}`;
      }
    } else if (day < 10) {
      dateFourDigit = `${monthNum}0${day}`;
    } else {
      dateFourDigit = `${monthNum}${day}`;
    }

    loadDate(day, e.target.cellIndex);
    e.target.classList.add('day-active');
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
    /* reloadTodo(); */
  }
});

const validDate = [
  '0602',
  '0603',
  '0604',
  '0609',
  '0610',
  '0611',
  '0616',
  '0617',
  '0618',
  '0623',
  '0624',
  '0624',
  '0630',
  '0701',
  '0702',
];

const clickedDateBox = document.querySelector('.clicked-date');

clickedDateBox.addEventListener('click', function() {
  const pageURL = `./${dateFourDigit}.html`;
  if (validDate.indexOf(dateFourDigit) !== -1) {
    window.open(pageURL, '_self');
  } else {
    alert('선택한 날짜에는 한자단어장이 없습니다!');
  }
  console.log(dateFourDigit);
});
