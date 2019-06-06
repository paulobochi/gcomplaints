FROM ruby:2.6.3-alpine3.9 as builder

RUN mkdir -p /app
WORKDIR /app

RUN apk add --no-cache --virtual build-dependencies \
  build-base \
  git

COPY Gemfile Gemfile.lock /app/
RUN bundle install

COPY . /app/

# Set system locale
RUN apk add tzdata --no-cache \
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo "America/Sao_Paulo" > /etc/timezone