from whisper import load_model

# VERY IMPORTANT THIS IS THE LINE THAT LOADS THE MODEL SIZE FROM WHISPER
model = load_model("small")  # Load model globally to avoid reloading each time

