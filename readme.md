## Pacer

### By Lark Lundberg

[Trello](https://trello.com/b/1BuXsizy/reading-calendar)
[Pacer Link](https://pacer-reader.herokuapp.com/)

---

### Description

Pacer is an app that helps you meet your reading monthly goals. Add up to four books that you want to read this month, and it calculates a reading schedule to help you meet your goal. The animation (currently edited from the NES game Punch-Out!!, but which will be replaced with customizable characters) shows how much more you have to read to catch up to the pacer bicycle.

The data is stored on MongoDB in two databases, one for the schedule and one for the books (each tied to a user database). Because of this set up, it's easy to track your performance throughout the month, which will be displayed on a "stats" screen at the end of the month.

Currently, your daily pages are reset when you first open the browser after a day change in your time zone. Because of the code, you may have to refresh the index once to get it to properly appear - a problem I will fix when I refactor it.

I had one opportunity to test the month rollover and the day rollover each. I am about 70 percent sure they 90 percent work. When I refactor, I will add a debug mode to test more thoroughly.

### Technologies Used

- Express
- MongoDB
- Mongoose
- PixiJS
- GIMP Image Editor
- Texture Packer to pack sprites

## Sources

The Punch-Out sprites were taken from a sprite database: [Spriters' Resource](https://www.spriters-resource.com/fullview/13034/)
A function to check the number of days in a month I used: [30 Seconds of Code](https://www.30secondsofcode.org/js/s/days-in-month/)
A PixiJS/Texture Packer tutorial I used: [PixiJS](https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs)
