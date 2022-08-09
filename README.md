# Integration between Contentstack and Coveo

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

About Coveo: Coveo is a Search and Relevance plaform using Machine Learning to personalize experiences for every user.

About this project: This is an integration of a Coveo Search page using Coveo's library Atomic within Contentstack's React demo.


## Contentstack demo

This project is a fork of https://github.com/contentstack/contentstack-react-starter-app. Follow the instructions on that repo to set up Contentstack. Documentation for Contentstack is also available from that repo.

## Coveo integration - Atomic

Coveo's integration is using [atomic-react](https://docs.coveo.com/en/atomic/latest/usage/frameworks/atomic-react-wrapper/).

Be sure to [copy the static assets](https://docs.coveo.com/en/atomic/latest/usage/frameworks/atomic-react-wrapper/#static-assets) after importing the dependencies.


## How to run

1. Copy `.env.example` to a new file `.env` and update the variables
2. From the command line: 

    * `npm install`
    * `npm start`
