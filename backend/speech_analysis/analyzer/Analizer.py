import importlib
import os
import sys

"""
    This File handles loading all analyzers from the modules dynamically and to apply the analysis
"""

class BaseAnalyserClass:
    """
    Base class to store common paths used by all analyzers and the analyzer_root path.
    """
    def __init__(self, paths, analyzer_root):
        self.analyzer_root = analyzer_root
        self.paths = paths


class AnalyzerLoader(BaseAnalyserClass):
    """
        Loader class for dynamically loading analyzer modules based on specified paths.
        Inherits from BaseAnalyzerClass.
    """
    def __init__(self, paths, analyzer_root):
        super().__init__(paths, analyzer_root)
        self.analyzers = self.load_analyzers(self.paths)

    def load_analyzers(self, paths):
        """
            Loads analyzer modules with an `analyze` function from the specified paths

            Args: paths(list): list of directories containing analyzer modules

            Returns: dict: Dictionary of loaded analyzers by type and name.
        """
        analyzers = {} # Will hold the analyzers by type and name

        for path in paths:
            if not os.path.isdir(path):
                print(f"Warning: Directory '{path}' does not exist.")
                continue

            # Use path relative to analyzer_root for module imports
            relative_path = os.path.relpath(path, start=self.analyzer_root).replace(os.sep, '.')

            for filename in os.listdir(path):
                """
                    Just loading all analyzers from folders
                """
                if filename.endswith('_analyzer.py'):
                    module_name = f"{relative_path}.{filename[:-3]}"
                    print(f"Trying to import module: {module_name}")

                    try:
                        module = importlib.import_module(module_name)
                        analyze_func = getattr(module, 'analyze', None)

                        # Check if 'analyze' function is present
                        if analyze_func:
                            print(f"Loaded {module_name}.analyze successfully")
                            analyzer_type = os.path.basename(path)
                            analyzers.setdefault(analyzer_type, {})[filename[:-3]] = analyze_func
                        else:
                            print(f"No 'analyze' function found in {module_name}")

                    except ModuleNotFoundError as e:
                        print(f"Module not found: {module_name} - {e}")
                    except Exception as e:
                        print(f"Error importing {module_name}: {e}")

        print("Loaded analyzers:", analyzers)
        return analyzers


class Analyzer(AnalyzerLoader):
    """
       Analyzer class for performing analysis with loaded analyzers.
    """
    def analyze(self, text):
        results = {}
        for analyzer_type, analyses in self.analyzers.items():
            # Initialize a dictionary for each analyzer type if it doesn't exist
            results[analyzer_type] = results.get(analyzer_type, {})

            for analysis_name, analysis_func in analyses.items():
                # Call the analysis function and store the result
                results[analyzer_type][analysis_name] = analysis_func(text)

        return results

