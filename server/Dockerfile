FROM python:3.10-slim

WORKDIR /smartsales

# Copy the current directory contents into the container at /app
COPY . /smartsales

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8080

# Run the application
CMD ["python", "main.py"]
