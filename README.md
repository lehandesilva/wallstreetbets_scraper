# Project Overview

This project is a r/wallstreetbets sentiment analysis dashboard. It scrapes the subreddit for stock tickers and their sentiment from the
OP and the sentiment comments as well.

### Technologies, frameworks and libraries used:

- js
- python
- scikit learn
- nltk
- kafka
- flink (overkill for the usecase but i remembered that im goated)

### How it works:

PRAW (webscraper) -> Kafka Producer -> Flink (streaming) -> Kafka (consumer) -> React (webapp)

### To do/ plan:

- scrape data from the r/wallstreetbets subreddit
