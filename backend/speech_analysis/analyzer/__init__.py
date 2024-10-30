import os
import sys
from .Analizer import Analyzer

"""
This file is responsible to load dynamically all analyzers and a function to do it all
"""

# Default root path for analyzers and ensure it's in sys.path
DEFAULT_ANALYZER_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)))
if DEFAULT_ANALYZER_ROOT not in sys.path:
    sys.path.insert(0, DEFAULT_ANALYZER_ROOT)


# Define paths to each analyzer directory directly
analyzer_paths = [
    os.path.join(DEFAULT_ANALYZER_ROOT, 'basic_text_analyzer'),
    # Add more
]

# Instantiate the AnalyzerLoader
analyzer_instance = Analyzer(analyzer_paths, DEFAULT_ANALYZER_ROOT)


# Perform an analysis
def analyze(text):
    return analyzer_instance.analyze(text)