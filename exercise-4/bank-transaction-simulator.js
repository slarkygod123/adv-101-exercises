
// Name: Daniel Ceruela
// Course: BSIT

// -------- Instruction -----------
// --Bank Transaction Simulator--
// You try to transfer money: checkBalance() → deductAmount() → confirmTransaction().
// Each step is a promise (with possible failure like "Insufficient funds").
// If all succeed, resolve with "Transaction complete".
// Otherwise reject with an error message.

const userBalance = 1000;
const minimumTransferAmount = 20;

// check the balance first if it's greater than minimumTransferAmount
const checkBalance = new Promise((res, err) => {
    if(userBalance > minimumTransferAmount) res({ currentUserBalance: userBalance });
    else err("Insufficient funds");
});

const deductAmount = new Promise((res, err) =>  {
    // random amount deducted betweeen 20 to userBalance - 1
    const userAmountToDeduct = Math.floor(Math.random() * (userBalance-1 - 20 + 1)) + 20;

    if(userAmountToDeduct <= userBalance) res({ amountToDeduct: userAmountToDeduct});
    else err("Insufficient funds");
});

// checks the confirmation of the transaction if it's successful
const confirmTransaction = new Promise( async (res, err) => {
    try{
        const balance = await checkBalance;
        const toDeduct = await deductAmount;

       res({
        message: "Transaction complete",
        deducatedAmount: toDeduct.amountToDeduct,
        newBalance: balance.currentUserBalance - toDeduct.amountToDeduct});
        
    }catch(error){
        err("Insufficient funds");
    }
});

// display the result of the transaction
confirmTransaction.then( res => console.log(res)).catch( err => console.log(err));







