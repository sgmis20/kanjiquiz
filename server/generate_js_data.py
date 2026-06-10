"""kanji_data.py 의 단어 데이터를 정적 데모용 javascript/kanjiData.js 로 내보낸다.

사용법: cd server && python3 generate_js_data.py
"""
import json
import os

from kanji_data import KANJI_DATA

OUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        '..', 'javascript', 'kanjiData.js')


def main():
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('// server/kanji_data.py 에서 생성한 단어 데이터 (수정은 파이썬 쪽에서)\n')
        f.write('// 생성: cd server && python3 generate_js_data.py\n')
        f.write('const KANJI_DATA = ')
        f.write(json.dumps(KANJI_DATA, ensure_ascii=False, indent=2))
        f.write(';\n')
    total = sum(len(v['words']) for v in KANJI_DATA.values())
    print(f'{OUT_PATH} 생성 완료: {len(KANJI_DATA)}개 날짜, {total}단어')


if __name__ == '__main__':
    main()
