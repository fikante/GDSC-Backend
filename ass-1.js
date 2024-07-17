//Exercise 1
    function starPattern(){
        for(i=0; i<5; i++){
            console.log("*".repeat(i+1));
        }
    }
    starPattern();
//Exercise 2
    function GCF(num1,num2){
        while(num2!=0){
           let r = num1 % num2;
            num1=num2;
            num2=r;
        }
        return num1
    }
    let result = GCF(48,18)
    console.log(result)
