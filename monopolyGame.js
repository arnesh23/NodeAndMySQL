var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "monopolyDB"
  });

  //connect to Database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptPlayersName();
  });


// Print the Game's Name on the console.
console.log("WELCOME TO MONOPOLY GAME BY ARNESH REGMI!!!!!")
console.log("THIS GAME HAS FOUR PLAYERS ONLY!")

var numOfPlayers = 4;

// Prompt the players' name
// Four players max
function promptPlayersName(){
    inquirer.prompt([
        {
          type: "input",
          name: "player1",
          message: "Enter player one name",
        },
        {
            type: "input",
            name: "player2",
            message: "Enter player two name",
          },
          {
            type: "input",
            name: "player3",
            message: "Enter player three name",
          },
          {
            type: "input",
            name: "player4",
            message: "Enter player four name",
          },
      ])
        .then(function (inquirerResponse) { 
          //Insert the Four players into the database
          insertPlayersToDB(inquirerResponse.player1);
          insertPlayersToDB(inquirerResponse.player2);
          insertPlayersToDB(inquirerResponse.player3);
          insertPlayersToDB(inquirerResponse.player4);
          playGame();
        });
}

// Add the users to the DATABASE
function insertPlayersToDB(playerInput)
{
  console.log("PLAYER CALLED:");
  console.log(playerInput);
  var query = connection.query(
    "INSERT INTO players SET ?",
    {
      playerName: playerInput,
      bankBalance: 1000,
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
    }
  );
}

function playGame(){
  console.log("Selecting all players...\n");
  connection.query("SELECT * FROM players", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.log(res.length);

    for(var i = 0; i < res.length; i++)
    {
      console.log(res[i]["playerName"]+ " is rolling dice");
      var dice = Math.floor(Math.random() * 6) + 2;
      console.log(res[i]["playerName"]+ " gets number:"+dice);
      updatePosition(res[i]["playerName"], dice);

    }
  });
}

function updatePosition(player, dice) {
  console.log("Updating \n");
  var query = connection.query(
    "UPDATE players SET ? WHERE ?",
    [
      {
        position: dice
      },
      {
        playerName: player
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " players updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      //deleteProduct();
    }
  );
  }
