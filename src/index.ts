import inquirer from "inquirer";
import chalk from "chalk";
const game = async () => {
  let condition: boolean = true;
  do {
    console.clear();
    console.log(chalk.bgGreenBright("Welcome to Guess The Number Game"));

    const difficulty = await inquirer.prompt([
      {
        name: "diff",
        message: chalk.cyanBright("Select your difficulty level"),
        type: "list",
        choices: ["Easy", "Medium", "Hard"],
      },
    ]);
    let lifes: number = 0;
    let randomNumber: number = Math.floor(Math.random() * 11);
    let end: number = 0;
    if (difficulty.diff === "Easy") {
      lifes = 5;
      randomNumber = Math.floor(Math.random() * 11);
      end = 10;
    } else if (difficulty.diff === "Medium") {
      lifes = 5;
      randomNumber = Math.floor(Math.random() * 13);
      end = 12;
    } else if (difficulty.diff === "Hard") {
      lifes = 4;
      randomNumber = Math.floor(Math.random() * 15);
      end = 14;
    }
    console.log(chalk.green(`You have ${lifes} lifes`));
    await chooseNumber(lifes, randomNumber, end);

    condition = await runAgain(condition);
  } while (condition === true);
};

// choose number function
const chooseNumber = async (
  lifes: number,
  randomNumber: number,
  end: number
) => {
  do {
    let choice = await inquirer.prompt([
      {
        name: "ch",
        message: chalk.cyanBright(`Enter a number between 0 and ${end}`),
        type: "number",
        validate: (input) => {
          if (isNaN(input) === true) {
            return "Invalid input, press UP arrow and enter number again";
          } else {
            return true;
          }
        },
      },
    ]);
    if (choice.ch === randomNumber) {
      console.log(chalk.green(`You won`));
      break;
    } else if (choice.ch < randomNumber) {
      console.log(chalk.red(`Enter a greater number`));
      lifes--;
    } else if (choice.ch > randomNumber) {
      console.log(chalk.red(`Enter a smaller number`));
      lifes--;
    }
    console.log(chalk.cyanBright(`Remaining lifes: ${lifes}`));
  } while (lifes > 0);
  if (lifes === 0) {
    console.log(chalk.green(`The hidden number was ${randomNumber}`));
  }
};

const runAgain = async (condition: boolean) => {
  const choice = await inquirer.prompt([
    {
      name: "x",
      message: chalk.cyanBright("Do you want to play the game again?"),
      type: "list",
      choices: ["Yes", "No"],
    },
  ]);
  if (choice.x === "Yes") {
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

await game();
