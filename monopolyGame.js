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

// Prompt the players' name
// Four players max
function promptPlayersName(){
    inquirer.prompt([
        {
          type: "input",
          name: "playerOne",
          message: "Enter player one name",
        },
        {
            type: "input",
            name: "playerTwo",
            message: "Enter player two name",
          },
          {
            type: "input",
            name: "playerThree",
            message: "Enter player three name",
          },
          {
            type: "input",
            name: "playerFour",
            message: "Enter player four name",
          },
      ])
        .then(function (inquirerResponse) {
          insertPlayersToDB(inquirerResponse.playerOne, inquirerResponse.playerTwo, inquirerResponse.playerThree, inquirerResponse.playerFour);
        });
}


// Add the users to the DATABASe
function insertPlayersToDB(player1, player2, player3,player4)
{
    var query = connection.query("INSERT INTO players (playerName, bankBalance) VALUES ?",
        (player1,1000),
        (player2, 1000),
        (player3, 1000),
        (player4, 1000),
    function(err, res) {
      console.log(res.affectedRows + "items  inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
      console.log(res);
    }
  );
}
