from flask import Flask, render_template, request, send_from_directory
import random
import os
from kanji_data import KANJI_DATA

app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), '..'),
    static_url_path='/static'
)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


@app.route('/quiz')
def quiz_form():
    pages = []
    for key in sorted(KANJI_DATA.keys()):
        entry = KANJI_DATA[key]
        pages.append({
            "value": key,
            "label": f"{entry['label']} ({entry['pages']}페이지)",
            "count": len(entry["words"])
        })
    total = sum(len(v["words"]) for v in KANJI_DATA.values())
    return render_template('quiz_form.html', pages=pages, total=total)


@app.route('/quiz/generate', methods=['POST'])
def quiz_generate():
    page_key = request.form.get('selectedPage', 'all')
    num_q = int(request.form.get('howMany', 10))

    if page_key == 'all':
        pool = []
        for v in KANJI_DATA.values():
            pool.extend(v["words"])
        label = '전체 데이터 (랜덤)'
        pages_str = '67~118'
    else:
        entry = KANJI_DATA.get(page_key)
        if not entry:
            return '잘못된 페이지입니다', 400
        pool = list(entry["words"])
        label = entry["label"]
        pages_str = entry["pages"]

    random.shuffle(pool)
    if num_q > len(pool):
        num_q = len(pool)
    selected = pool[:num_q]

    rows = []
    for i in range(0, len(selected), 5):
        rows.append(selected[i:i+5])

    return render_template(
        'quiz_result.html',
        label=label,
        pages_str=pages_str,
        questions=selected,
        rows=rows
    )


@app.route('/api/words')
def api_words():
    page_key = request.args.get('page', 'all')
    count = request.args.get('count', '10', type=int)

    if page_key == 'all':
        pool = []
        for v in KANJI_DATA.values():
            pool.extend(v["words"])
    else:
        entry = KANJI_DATA.get(page_key)
        if not entry:
            return {"error": "invalid page"}, 400
        pool = list(entry["words"])

    random.shuffle(pool)
    if count > len(pool):
        count = len(pool)

    return {"words": pool[:count]}


@app.route('/api/pages')
def api_pages():
    result = []
    for key in sorted(KANJI_DATA.keys()):
        entry = KANJI_DATA[key]
        result.append({
            "key": key,
            "label": entry["label"],
            "pages": entry["pages"],
            "word_count": len(entry["words"])
        })
    return {"pages": result, "total_words": sum(len(v["words"]) for v in KANJI_DATA.values())}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
