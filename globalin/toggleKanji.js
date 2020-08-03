/* eslint-disable */

// tangoToYomigana 좌측 테이블 li 엘리먼트 생성
const leftHandSide = document.getElementById('tangoToYomigana');

const strongLeft01 = '<strong class="tango">';
const strongLeft02 = '</strong><strong class="toYomigana">';
const strongLeft03 = '</strong>';

// const left01 = '123';
// const left02 = '123';
// const left03 = '123';
// const left04 = '123';
// const left05 = '123';
// const left06 = '123';
// const left07 = '123';
// const left08 = '123';
// const left09 = '123';
// const left10 = '123';
// const left11 = '123';
// const left12 = '123';
// const left13 = '123';
// const left14 = '123';
// const left15 = '123';

const listLeftContent = [left01, left02, left03, left04, left05, left06, left07, left08, left09, left10, left11, left12, left13, left14, left15,];

// Old way
// const leftSentenceToString = listLeftContent.slice();

// ES6 way
const leftSentenceToString = [...listLeftContent];

for (let i = 0; i < listLeftContent.length; i++) {
  listLeftContent[i] = listLeftContent[i].replace('1', strongLeft01);
  listLeftContent[i] = listLeftContent[i].replace('2', strongLeft02);
  listLeftContent[i] = listLeftContent[i].replace('3', strongLeft03);
  const listTag = `<li><span>${listLeftContent[i]}</span></li>`;
  leftHandSide.insertAdjacentHTML('beforeend', listTag);
}

// yomiganaToTango 우측 테이블 li 엘리먼트 생성
const rightHandSide = document.getElementById('yomiganaToTango');

const strongRight01 = '<strong class="yomigana">';
const strongRight02 = '</strong><strong class="toTango">';
const strongRight03 = '</strong>';

// const right01 = '123';
// const right02 = '123';
// const right03 = '123';
// const right04 = '123';
// const right05 = '123';
// const right06 = '123';
// const right07 = '123';
// const right08 = '123';
// const right09 = '123';
// const right10 = '123';
// const right11 = '123';
// const right12 = '123';
// const right13 = '123';
// const right14 = '123';
// const right15 = '123';

const listRightContent = [right01, right02, right03, right04, right05, right06, right07, right08, right09, right10, right11, right12, right13, right14, right15,];

const rightSentenceToString = [...listRightContent];

for (let i = 0; i < listRightContent.length; i++) {
  listRightContent[i] = listRightContent[i].replace('1', strongRight01);
  listRightContent[i] = listRightContent[i].replace('2', strongRight02);
  listRightContent[i] = listRightContent[i].replace('3', strongRight03);
  const listTag = `<li><span>${listRightContent[i]}</span></li>`;
  rightHandSide.insertAdjacentHTML('beforeend', listTag);
}

// Strong tag 종류별 toString
let tangoList = '';
const tango = document.getElementsByClassName('tango');
for (let i = 0; i < tango.length; i++) {
  if (tango[i].innerText === '') continue;
  tangoList += `"${tango[i].innerText}",`;
}
const tangoListToString = tangoList.substring(0, tangoList.length - 1);

let toYomiganaList = '';
const toYomigana = document.getElementsByClassName('toYomigana');
for (let i = 0; i < toYomigana.length; i++) {
  if (toYomigana[i].innerText === '') continue;
  toYomiganaList += `"${toYomigana[i].innerText}",`;
}
const toYomiganaListToString = toYomiganaList.substring(0,toYomiganaList.length - 1);

let yomiganaList = '';
const yomigana = document.getElementsByClassName('yomigana');
for (let i = 0; i < yomigana.length; i++) {
  if (yomigana[i].innerText === '') continue;
  yomiganaList += `"${yomigana[i].innerText}",`;
}
const yomiganaListToString = yomiganaList.substring(0, yomiganaList.length - 1);

let toTangoList = '';
const toTango = document.getElementsByClassName('toTango');
for (let i = 0; i < toTango.length; i++) {
  if (toTango[i].innerText === '') continue;
  toTangoList += `"${toTango[i].innerText}",`;
}
const toTangoListToString = toTangoList.substring(0, toTangoList.length - 1);

function showList() {
  console.log('tangoListToString');
  console.log(tangoListToString);
  console.log('');
  console.log('toYomiganaListToString');
  console.log(toYomiganaListToString);
  console.log('');
  console.log('yomiganaListToString');
  console.log(yomiganaListToString);
  console.log('');
  console.log('toTangoListToString');
  console.log(toTangoListToString);
  console.log('');
}

function showSentences() {
  console.log('leftSentenceToString');
  for (let i = 0; i < leftSentenceToString.length; i++) {
    leftSentenceToString[i] = leftSentenceToString[i].replace('1', '');
    leftSentenceToString[i] = leftSentenceToString[i].replace('2', '');
    leftSentenceToString[i] = leftSentenceToString[i].replace('3', '');
    console.log(leftSentenceToString[i]);
  }
  console.log('');

  console.log('rightSentenceToString');
  for (let i = 0; i < rightSentenceToString.length; i++) {
    rightSentenceToString[i] = rightSentenceToString[i].replace('1', '');
    rightSentenceToString[i] = rightSentenceToString[i].replace('2', '');
    rightSentenceToString[i] = rightSentenceToString[i].replace('3', '');
    console.log(rightSentenceToString[i]);
  }
  console.log('');
}

// toggle 버튼 이벤트리스너
function hideLeftLatter() {
  const leftLatter = document.getElementsByClassName('toYomigana');
  let i;
  for (i = 0; i < leftLatter.length; i++) {
    leftLatter[i].style.display = 'none';
  }
}
hideLeftLatter();

function hideRightLatter() {
  const rightLatter = document.getElementsByClassName('toTango');
  let i;
  for (i = 0; i < rightLatter.length; i++) {
    rightLatter[i].style.display = 'none';
  }
}
hideRightLatter();

function toggleLeftItems() {
  const leftFormer = document.getElementsByClassName('tango');
  const leftLatter = document.getElementsByClassName('toYomigana');
  let i;
  for (i = 0; i < leftLatter.length; i++) {
    if (leftLatter[i].style.display === 'none') {
      leftFormer[i].style.display = 'none';
      leftLatter[i].style.display = 'inline-block';
    } else {
      leftFormer[i].style.display = 'inline-block';
      leftLatter[i].style.display = 'none';
    }
  }
}

function toggleRightItems() {
  const rightFormer = document.getElementsByClassName('yomigana');
  const rightLatter = document.getElementsByClassName('toTango');
  let i;
  for (i = 0; i < rightLatter.length; i++) {
    if (rightLatter[i].style.display === 'none') {
      rightFormer[i].style.display = 'none';
      rightLatter[i].style.display = 'inline-block';
    } else {
      rightFormer[i].style.display = 'inline-block';
      rightLatter[i].style.display = 'none';
    }
  }
}

document.querySelector('.toggleLeft').addEventListener('click', {
  handleEvent(event) {
    toggleLeftItems();
  },
});

document.querySelector('.toggleRight').addEventListener('click', {
  handleEvent(event) {
    toggleRightItems();
  },
});

document.querySelector('.toggleAll').addEventListener('click', {
handleEvent(event) {
    toggleLeftItems();
    toggleRightItems();
  },
});

showList();
showSentences();

// strong tag - create Link to Naver japanese dictionary

const strongTango = document.getElementsByClassName('tango');
        let i;
        for (i = 0; i < strongTango.length; i++) {
            const tangoText = strongTango[i].innerHTML;
            strongTango[i].addEventListener('click', {
                handleEvent(event) {
                    const url = `https://ja.dict.naver.com/#/search?range=all&query=${tangoText}`;
                    window.open(url, '_blank');
                },
            });
        }
        const strongYomigana = document.getElementsByClassName('yomigana');

        for (i = 0; i < strongYomigana.length; i++) {
            const yomiganaText = strongYomigana[i].innerHTML;
            strongYomigana[i].addEventListener('click', {
                handleEvent(event) {
                    const url = `https://ja.dict.naver.com/#/search?range=all&query=${yomiganaText}`;
                    window.open(url, '_blank');
                },
            });
        }