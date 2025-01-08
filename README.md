# Project Overview

This project is a r/wallstreetbets sentiment analysis dashboard. It scrapes the subreddit under the "dd"(due diligence) flair to get its OP(Original Poster)'s sentiment on the stock being discussed and the sentiment from the comments as well.

### Technologies, frameworks and libraries used:

- js
- python
- scikit learn
- nltk
- kafka
- flink (overkill for the usecase but i remembered that im goated)

### How it works:

PRAW (webscraper) -> Kafka Producer -> Flink (streaming) -> Kafka (consumer) -> React (webapp)

### To do plan:

- [x] Scrape data from the r/wallstreetbets subreddit
- [ ] Store scraped data in a database
- [ ] Set up Kafka producers and consumers
- [ ] Clean and prep data
- [ ] Perform sentiment analysis on the scraped data
- [ ] Implement Flink for data streaming
- [ ] Develop the React web application for the dashboard
- [ ] Integrate sentiment analysis results into the web application
- [ ] Test the entire pipeline end-to-end
- [ ] Deploy the application to a cloud platform
