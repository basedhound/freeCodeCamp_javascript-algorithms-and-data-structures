function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  // Get the class average using the getAverage function
  const classAverage = getAverage(totalScores);
  
  // Get the student's grade using the getGrade function
  const studentGrade = getGrade(studentScore);
  
  // Check if the student passed or failed the course
  const passed = hasPassingGrade(studentScore);
  
  // Build the message based on whether the student passed or failed
  let message = "Class average: " + classAverage + ". Your grade: " + studentGrade + ". ";
  
  if (passed) {
    message += "You passed the course.";
  } else {
    message += "You failed the course.";
  }
  
  return message;
}

