from .basic_text_analyzer.word_count_analyzer import word_count_analyzer

analyzers = {
    "word_count": word_count_analyzer,
}


def analyze(text):
    results = {}
    for name, analyzer_func in analyzers.items():
        results[name] = analyzer_func(text)

    return results