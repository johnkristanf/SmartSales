FROM python:3.10-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

EXPOSE 9090

CMD ["gunicorn", "--bind", "0.0.0.0:9090", "main:app"]
