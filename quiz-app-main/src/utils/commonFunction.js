export const shuffleArray=(array)=>{
    const shuffledArray = [...array]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

export const CheckAns=(questionArr,ansArr)=>{
    let count=0;
    questionArr.forEach((item,index) => {
        if(item?.correct_answer===ansArr[index]?.ans){
            count++;
        }
    });
    return count;
    
}