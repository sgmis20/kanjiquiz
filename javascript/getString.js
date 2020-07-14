let yomiganaList = '';
let tangoList = '';
let korList = '';
function getKanjiList() {
  const yomigana = document.getElementsByClassName('yomigana');
  console.log(`yomigana.length = ${yomigana.length}`);
  for (let i = 0; i < yomigana.length; i++) {
    if (yomigana[i].innerText === '') continue;
    yomiganaList += `"${yomigana[i].innerText}",`;
  }

  const tango = document.getElementsByClassName('tango');
  console.log(`tango.length = ${tango.length}`);
  for (let i = 0; i < tango.length; i++) {
    if (tango[i].innerText === '') continue;
    tangoList += `"${tango[i].innerText}",`;
  }

  const kor = document.getElementsByClassName('kor');
  console.log(`kor.length = ${kor.length}`);
  for (let i = 0; i < kor.length; i++) {
    if (kor[i].innerText === '') continue;
    korList += `"${kor[i].innerText}",`;
  }
}
getKanjiList();
