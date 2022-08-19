let fs = require("fs");
let data = fs.readFileSync(0, 'utf-8');
let idx = 0;
data = data.split('\n');

function readLine() {
  idx++;
  return data[idx - 1];
}

// -------- Do NOT edit anything above this line ----------
function sumOfDivisors(n){
  //Code here
  if(n===1){
	  return 1;
  }else{
	  	let sum=1+n;
  		for(let i=2; i<=parseInt(n/2); i++){
	  		if(n%i===0){
		  		sum+=i;
	 		 }
  }
  return sum;
  }
  
}
    

let n = parseInt(readLine());
console.log(sumOfDivisors(n));