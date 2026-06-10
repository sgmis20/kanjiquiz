import os
import random

from flask import Flask, render_template, request, send_from_directory

from kanji_data import KANJI_DATA

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__, static_folder=ROOT_DIR, static_url_path='/static')

NUM_CHOICES = (5, 10, 15, 20, 25, 30)


def build_pool(page_key):
    """선택한 날짜(또는 'all')의 단어 풀과 표시용 라벨을 돌려준다.

    잘못된 키면 (None, None) 을 돌려준다.
    """
    if page_key == 'all':
        pool = [w for entry in KANJI_DATA.values() for w in entry['words']]
        return pool, '전체 데이터 (랜덤)'
    entry = KANJI_DATA.get(page_key)
    if entry is None:
        return None, None
    return list(entry['words']), f"{entry['label']}  /  {entry['pages']}페이지"


def page_summaries():
    """폼/API 용 날짜별 요약 목록 (월별 그룹 키 포함)."""
    result = []
    for key in sorted(KANJI_DATA.keys()):
        entry = KANJI_DATA[key]
        result.append({
            'key': key,
            'month': int(key[:2]),
            'label': entry['label'],
            'pages': entry['pages'],
            'word_count': len(entry['words']),
        })
    return result


def total_words():
    return sum(len(v['words']) for v in KANJI_DATA.values())


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


@app.route('/quiz')
def quiz_form():
    pages = page_summaries()
    months = sorted({p['month'] for p in pages})
    return render_template('quiz_form.html', pages=pages, months=months,
                           total=total_words(), num_choices=NUM_CHOICES)


@app.route('/quiz/generate', methods=['POST'])
def quiz_generate():
    page_key = request.form.get('selectedPage', 'all')
    try:
        num_q = int(request.form.get('howMany', 10))
    except ValueError:
        num_q = 10

    pool, label = build_pool(page_key)
    if pool is None:
        return '잘못된 페이지입니다', 400

    random.shuffle(pool)
    selected = pool[:min(num_q, len(pool))]

    return render_template('quiz_result.html', label=label, questions=selected)


@app.route('/api/words')
def api_words():
    page_key = request.args.get('page', 'all')
    count = request.args.get('count', 10, type=int)

    pool, _ = build_pool(page_key)
    if pool is None:
        return {'error': 'invalid page'}, 400

    random.shuffle(pool)
    return {'words': pool[:min(count, len(pool))]}


@app.route('/api/pages')
def api_pages():
    return {'pages': page_summaries(), 'total_words': total_words()}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
