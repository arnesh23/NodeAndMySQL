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
  var playersArray = [];
  console.log("Selecting all players...\n");
  connection.query("SELECT * FROM players", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("THE PLAYERS ARE!!!!");
    console.log(res[0]["playerName"]);
    console.log(res[1]["playerName"]);
    console.log(res[2]["playerName"]);
    console.log(res[3]["playerName"]);

    inquirer.prompt([
      {
        type: "checkbox",
        name: "player",
        message: "Pick a player",
        choices: [res[0]["playerName"],res[1]["playerName"],res[2]["playerName"],res[3]["playerName"]]
      },
    ])
      .then(function (inquirerResponse) { 
        console.log(inquirerResponse.player +" is rolling a dice");
        playersArray.push(inquirerResponse.player);
        var dice = Math.floor(Math.random() * 8) + 2 
        updatePosition(inquirerResponse.player, dice)
    
  });
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
      promptPurchaseProperty(player, dice);
      //deleteProduct();
    }
  );
  }

  function promptPurchaseProperty(player, dice)
  {
    var playerId = "";
    var query = connection.query(
      "SELECT ID FROM Players WHERE ?",
      {
        playerName: player
      },
      function(err, res) {
        //console.log(res.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        //updateProduct();
        console.log(player + res[0]["ID"]);
        playerId = res[0]["ID"];
        
      }
    );

    var query = connection.query(
      "SELECT ID,propertyName,propertyCost,Rent FROM Property WHERE ?",
      {
        position: dice
      },
      function(err, res1) {
        //console.log(res.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        //updateProduct();
        console.log("hello");
        console.log(res1);
        console.log(res1[0]["ID"]);
        if(res1[0]["ID"] === null){
          console.log(res1[0]["propertyName"]+" is up for purchase for a cost of $" +res1[0]["propertyCost"]);
          inquirer.prompt([
            {
              type: "checkbox",
              name: "purchase",
              message: "Would you like to purchase?",
              choices: ["Yes", "No"]
            },
          ])
            .then(function (inquirerResponse) { 
              console.log(inquirerResponse.purchase[0]);
              if(inquirerResponse.purchase[0] === "Yes"){
              //update Property database with Player's ID
              console.log("PLAYERID"+playerId);
              console.log("position"+dice);
              var query = connection.query(
                "UPDATE property SET ? WHERE ?",
                [
                  {
                    ID: playerId
                  },
                  {
                    position: dice
                  }
                ],
                function(err, res2) {
                 console.log(res2);
                }
              );

              //Deduct from player's bankBalance
              console.log("playerId"+playerId);
              var query = connection.query(
                "SELECT bankBalance from players Where ? ",
                  {
                    ID: playerId
                  },
                function(err, res3) {
                  console.log(res3);
                 console.log(res3[0]["bankBalance"]);
                 var query = connection.query(
                  "UPDATE players SET ? WHERE ? ",
                    [{
                      bankBalance: res3[0]["bankBalance"]-res1[0]["propertyCost"]
                    },
                    {
                      ID: playerId
                    },
                  ],
                  function(err, res4) {
                   console.log(res4);
                  }
                );
                }
              );

              }
              
            });
        }


      }
    );

  }
