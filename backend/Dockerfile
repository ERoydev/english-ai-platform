FROM python:3.12.5

# Set the working directory
WORKDIR /app/server

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files
COPY . .

# Expose port 8000
EXPOSE 8000

# Start Gunicorn server
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=4"]