const scores=[];

const scoreDiv = document.querySelector("div.scoreboard") 

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
    while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild) 
    
    let scoreboardTable = document.createElement('table') 
    scoreboardTable.className = 'scoreboardTable'

    let scoreboardTableHead = document.createElement('thead') 
    scoreboardTableHead.className = 'scoreboardTableHead'

    let scoreboardTableHeaderRow = document.createElement('tr') 
    scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow'

    
    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th') 
        scoreHeader.innerText = header
        scoreboardTableHeaderRow.append(scoreHeader) 
    })

    scoreboardTableHead.append(scoreboardTableHeaderRow) 
    scoreboardTable.append(scoreboardTableHead)

    let scoreboardTableBody = document.createElement('tbody') 
    scoreboardTableBody.className = "scoreboardTable-Body"

    scoreboardTable.append(scoreboardTableBody) 

    scoreDiv.append(scoreboardTable) 
}


const appendScores = (singleScore, singleScoreIndex) => {
    const scoreboardTable = document.querySelector('.scoreboardTable')

    let scoreboardTableBodyRow = document.createElement('tr') 
    scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'

    
    let scoreRanking = document.createElement('td')
    scoreRanking.innerText = singleScoreIndex
    let usernameData = document.createElement('td')
    usernameData.innerText = singleScore.username
    let accuracyData = document.createElement('td')
    accuracyData.innerText = singleScore.accuracy*100+"%"

    scoreboardTableBodyRow.append(scoreRanking, usernameData, accuracyData) 

    scoreboardTable.append(scoreboardTableBodyRow) 
}

const getScores = () => {
    scores.push(JSON.parse(localStorage.getItem("player")));
    createScoreboardTable() 
    
    for (const score of scores) {
        let scoreIndex = scores.indexOf(score) + 1 
        appendScores(score, scoreIndex) 
    }
    
}

getScores();