import pandas as pd
import numpy as np
from django.conf import settings
import os


# Handle different environments
if settings.STATIC_ROOT:  # Production
    file_path = os.path.join(settings.STATIC_ROOT, 'vocabulary_dataset.csv')
else:  # Development
    file_path = os.path.join(settings.BASE_DIR, 'static', 'vocabulary_dataset.csv')

try:
    # Load the dataset
    word_data = pd.read_csv(file_path)
    print("Dataset loaded successfully!")
except FileNotFoundError as e:
    print(f"File not found: {file_path}")


word_data['log_frequency'] = np.log10(word_data['count']) # Using logarithm to downscale my Big numbers to something simple


a1_threshold = word_data['log_frequency'].quantile(0.90)  # Top 10%
a2_threshold = word_data['log_frequency'].quantile(0.75)  # Top 25%
b1_threshold = word_data['log_frequency'].quantile(0.50)  # Median
b2_threshold = word_data['log_frequency'].quantile(0.25)  # Bottom 25%
c1_threshold = word_data['log_frequency'].quantile(0.10)  # Bottom 10%


def classify_cefr_by_log_frequency(log_freq, thresholds):
    """
    Classify a word's CEFR level based on its log frequency.
    """
    if thresholds['a1'] < log_freq < thresholds['a2']:
        return "A1"
    elif log_freq > thresholds['a2']:
        return "A2"
    elif log_freq > thresholds['b1']:
        return "B1"
    elif log_freq > thresholds['b2']:
        return "B2"
    elif log_freq > thresholds['c1']:
        return "C1"
    else:
        return "C2"


# Apply classification
thresholds = {
    'a1': a1_threshold,
    'a2': a2_threshold,
    'b1': b1_threshold,
    'b2': b2_threshold,
    'c1': c1_threshold
}

word_data['cefr_level'] = word_data['log_frequency'].apply(
    lambda x: classify_cefr_by_log_frequency(x, thresholds)
)
