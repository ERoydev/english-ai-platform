import pandas as pd
import os
from django.conf import settings
import logging

# Paths for datasets
primary_file_path = os.path.join(settings.STATIC_ROOT if settings.STATIC_ROOT else settings.BASE_DIR, 'static', 'cerf-vocabulary-dataset.csv')
c1_c2_file_path = os.path.join(settings.STATIC_ROOT if settings.STATIC_ROOT else settings.BASE_DIR, 'static', 'cerf-vocabulary-c1c2.csv')

try:
    # Load the primary dataset
    primary_data = pd.read_csv(primary_file_path)
    logging.info("Primary dataset loaded successfully!")
except FileNotFoundError as e:
    logging.error(f"Primary dataset not found: {primary_file_path}")
    primary_data = pd.DataFrame()  # Fallback to an empty DataFrame

try:
    # Load the C1/C2 dataset
    c1_c2_data = pd.read_csv(c1_c2_file_path)
    logging.info("C1/C2 dataset loaded successfully!")
except FileNotFoundError as e:
    logging.error(f"C1/C2 dataset not found: {c1_c2_file_path}")
    c1_c2_data = pd.DataFrame()  # Fallback to an empty DataFrame

# Standardize column names in the C1/C2 dataset
c1_c2_data.rename(columns={'headword': 'headword', 'pos': 'pos', 'CEFR': 'CEFR'}, inplace=True)

# Combine datasets
word_data = pd.concat([primary_data, c1_c2_data], ignore_index=True)

# Drop duplicates
word_data.drop_duplicates(subset=['headword', 'pos'], inplace=True)


# Save the combined dataset
word_data.to_csv(os.path.join(settings.BASE_DIR, 'static', 'combined_cerf_vocabulary.csv'), index=False)
logging.info("Combined dataset saved successfully!")