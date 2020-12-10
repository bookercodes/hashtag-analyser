import React, { useState } from 'react';
import './App.css';
import { CSVReader } from 'react-papaparse'
const convertKeysToCamelcase = require("camelcase-keys");
const _ = require("underscore")

const App = () => {
  const [allSubmissions, setAllSubmissions] = useState(null);
  const today = new Date()
  const start = new Date(2020, 11, today.getDate() - 1, 6)
  const end = new Date(2020, 11, today.getDate(), 15)

  const pickTodaysWinner = () => {
    const todaysContestants = allSubmissions.filter(submission => submission.tweetPostedTime >= start && submission.tweetPostedTime <= end)
    const winner = _.sample(todaysContestants)

    console.log('------')
    console.log('WINNER 🎉')
    console.log(`https://twitter.com/@${winner.username} Tweeted at ${winner.tweetPostedTime}`)
    console.log(winner.tweetContent)
    console.log(winner.tweetUrl)
  }

  const handleOnDrop = doc => {
    const submissions = doc
      .map(record => record.data)
      .map(submission => convertKeysToCamelcase(submission))
      .map(submission => {
        return {
          ...submission,
          tweetPostedTime: new Date(submission.tweetPostedTime)
        }
      })
      .filter(submission => submission.tweetType !== "ReTweet")
      .filter(submission => submission.tweetContent && submission.tweetContent.includes("https://"))
      setAllSubmissions(submissions)
  }

  return (
    <div className="App">
      <CSVReader
        onDrop={handleOnDrop}
        config={{ header: true }}
        addRemoveButton
      >
        <span>Export data.csv from trackmyhashtag.com and drag it here</span>
      </CSVReader>
      <input type="button" value={`Pick a random submission between ${start} and ${end}`} disabled={!allSubmissions} onClick={pickTodaysWinner}/>
    </div>)
}


export default App;
