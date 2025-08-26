export const calculateGradeAndPoints=(totalMarks:number)=>{
    let result={
        grade:'NA',
        gradePoints:0
    }

    if(totalMarks >= 0 && totalMarks <=29  ){
        result={
            grade:'F',
            gradePoints:0
        }
    }
    else if(totalMarks >= 30 && totalMarks <= 49 ){
        result={
            grade:'D',
            gradePoints:2.00
        }
    }
    else if(totalMarks >= 50 && totalMarks <= 69 ){
        result={
            grade:'C',
            gradePoints:3.00
        }
    }
    else if(totalMarks >= 70 && totalMarks <= 79 ){
        result={
            grade:'B',
            gradePoints:3.50
        }
    }
    else if(totalMarks >= 80 && totalMarks <= 100 ){
        result={
            grade:'A',
            gradePoints:4.00
        }
    }
    else {
        result={
        grade:'NA',
        gradePoints:0
    }
    }

    return result
}