const rl=require('readline');
const rlInterface=rl.createInterface(process.stdin, process.stdout);
rlInterface.question("What is your Name  ", (Name)=>{
    console.log("hello "+Name)
    rlInterface.close()
})
