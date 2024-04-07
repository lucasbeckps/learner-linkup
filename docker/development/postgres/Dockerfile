FROM postgres:16.1-alpine

COPY ./docker/development/postgres/postgresql.conf /etc/postgresql/

ENV POSTGRES_USER=${DB_USERNAME}
ENV POSTGRES_PASSWORD=${DB_PASSWORD}
ENV POSTGRES_DB=${DB_NAME}

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
