FROM python:3.9
RUN addgroup app && adduser --system --group app 
RUN mkdir /app && chown -R app:app /app
USER app
WORKDIR /app
COPY --chown=app:app requirements.txt ./
RUN pip3 install -r requirements.txt
COPY --chown=app:app . .
EXPOSE 5000
CMD ["python3","app.py"]
