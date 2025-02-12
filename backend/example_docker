# Use a lightweight Python base image
FROM python:3.12.5

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies (FFmpeg, Java, etc.)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    default-jre-headless \
    && apt-get clean && rm -rf /var/lib/

# Set the working directory inside the container
WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Preload Whisper model during build to avoid runtime download delays
RUN python -c "import whisper; whisper.load_model('small')"

# Expose the Gunicorn port
EXPOSE 8000

# Start Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
