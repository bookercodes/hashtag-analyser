const fs = require("fs")
const Papa = require("papaparse")
const _ = require("underscore")
const moment = require("moment")
const convertKeysToCamelcase = require("camelcase-keys");

const PATH = "data.csv"

const csv = fs.readFileSync(PATH, "utf-8")

Papa.parse(csv, {
  header: true,
  complete: result => {
    const submissions = result
      .data
      .map(submission => convertKeysToCamelcase(submission))
      .map(submission => { 
        return {
          ...submission,
          tweetPostedTime: new Date(submission.tweetPostedTime)
        }
      })
      .filter(submission => submission.tweetType !== "ReTweet")
      .filter(submission => submission.tweetContent && submission.tweetContent.includes("https://"))
    const submissionsByDay = _.groupBy(
        submissions,
        submission => submission.tweetPostedTime.getDate())
    const days = Object.keys(submissionsByDay)

    // 1. Print submissions by day
    // days.forEach(day => {
    //   console.log(day)
    //   submissionsByDay[day].forEach(submission => console.log(`\t${submission.tweetContent.replace(/\n/g, " ")}`))
    // })

    // 2. Count submissions by day
    // days.forEach(day => { 
    //   console.log(`December ${day}\t${submissionsByDay[day].length}`)
    // })


    // 3. Pick random winner between 15.00-15.00 
    const start = new Date("December 9 2020 06:00")
    const end = new Date("December 10 2020 15:00")	
    const todaysContestants = submissions.filter(submission => submission.tweetPostedTime >= start && submission.tweetPostedTime <= end)
    const winner = _.sample(todaysContestants)
    console.log('winner', winner)

  }
})


