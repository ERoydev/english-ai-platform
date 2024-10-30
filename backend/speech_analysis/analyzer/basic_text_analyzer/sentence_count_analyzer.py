import re

def analyze(text):
    # Using regex to match sentences ending with '.', '!', or '?'
    sentences = re.split(r'[.!?]+', text)
    # Filtering out any empty strings in the list
    sentences = [sentence for sentence in sentences if sentence.strip()]
    return len(sentences)