const scores=[];

const scoreDiv = document.querySelector("div.scoreboard") // Find the scoreboard div in our html

let tableHeaders = ["Global Ranking", "Username", "Accuracy [%]"]

const store=()=>{
    const formData= document.getElementById("txtin");
    localStorage.setItem("user",formData.value);
    window.location.href='/index.html';
}

const startGame=()=>{
    const txtVal=document.getElementById("txtin").value;
    if(txtVal.length!=0)
    {
        store();
    }
    else
    {
        alert("Username is required");
    }
}



const createScoreboardTable = () => {
    while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild) // Remove all children from scoreboard div (if any)
    
    let scoreboardTable = document.createElement('table') // Create the table itself
    scoreboardTable.className = 'scoreboardTable'

    let scoreboardTableHead = document.createElement('thead') // Creates the table header group element
    scoreboardTableHead.className = 'scoreboardTableHead'

    let scoreboardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
    scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow'

    // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th') // Creates the current header cell during a specific iteration
        scoreHeader.innerText = header
        scoreboardTableHeaderRow.append(scoreHeader) // Appends the current header cell to the header row
    })

    scoreboardTableHead.append(scoreboardTableHeaderRow) // Appends the header row to the table header group element
    scoreboardTable.append(scoreboardTableHead)

    let scoreboardTableBody = document.createElement('tbody') // Creates the table body group element
    scoreboardTableBody.className = "scoreboardTable-Body"

    scoreboardTable.append(scoreboardTableBody) // Appends the table body group element to the table

    scoreDiv.append(scoreboardTable) // Appends the table to the scoreboard div
}

// The function below will accept a single score and its index to create the global ranking
const appendScores = (singleScore, singleScoreIndex) => {
    const scoreboardTable = document.querySelector('.scoreboardTable') // Find the table we created

    let scoreboardTableBodyRow = document.createElement('tr') // Create the current table row
    scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'

    // Lines 72-85 create the 5 column cells that will be appended to the current table row
    let scoreRanking = document.createElement('td')
    scoreRanking.innerText = singleScoreIndex
    let usernameData = document.createElement('td')
    usernameData.innerText = singleScore.username
    let accuracyData = document.createElement('td')
    accuracyData.innerText = singleScore.accuracy*100+"%"

    scoreboardTableBodyRow.append(scoreRanking, usernameData, accuracyData) // Append all 5 cells to the table row

    scoreboardTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
}

const getScores = () => {
    scores.push(JSON.parse(localStorage.getItem("player")));
    createScoreboardTable() // Clears scoreboard div if it has any children nodes, creates & appends the table
    // Iterates through all the objects in the scores array and appends each one to the table body
    for (const score of scores) {
        let scoreIndex = scores.indexOf(score) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
        appendScores(score, scoreIndex) // Creates and appends each row to the table body
    }
    
}

getScores();