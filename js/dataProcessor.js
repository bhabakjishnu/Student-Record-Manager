/**
 * Student Record Manager - Data Processing Module
 * Pure functional utilities strictly following project standards:
 * - Array and object destructuring for variable assignments and function parameters
 * - Exclusively relies on .map(), .filter(), and .reduce() (no for, for...of, or forEach)
 * - Pure modular functions utilizing ES6 arrow syntax
 */

/**
 * Filters and returns students whose average score across all subjects is > 85.
 * Uses .filter() and calculates the score sum internally via .reduce().
 *
 * @param {Array} studentList - Array of student records
 * @returns {Array} List of students qualifying for honor roll
 */
export const getHonorRoll = (studentList = []) => {
  const [students] = [Array.isArray(studentList) ? studentList : (studentList?.students ?? [])];

  return students.filter(({ scores }) => {
    const { math, science, history } = scores;
    const [scoresList] = [[math, science, history]];
    const [totalScore, subjectCount] = [
      scoresList.reduce((acc, curr) => acc + curr, 0),
      scoresList.length
    ];
    const [averageScore] = [totalScore / subjectCount];
    return averageScore > 85;
  });
};

/**
 * Transforms student records into simplified cards containing only:
 * - firstName: string (student's first name)
 * - gradeLevel: number | string (grade level)
 * - isHonorRoll: boolean (true if average score > 85)
 *
 * Uses .map() to transform student objects.
 *
 * @param {Array} studentList - Array of student records
 * @returns {Array} Formatted student card objects
 */
export const formatStudentCards = (studentList = []) => {
  const [students] = [Array.isArray(studentList) ? studentList : (studentList?.students ?? [])];

  return students.map(({ name, gradeLevel, scores }) => {
    const [firstName] = name.split(' ');
    const { math, science, history } = scores;
    const [scoresList] = [[math, science, history]];
    const [totalScore, subjectCount] = [
      scoresList.reduce((acc, curr) => acc + curr, 0),
      scoresList.length
    ];
    const [isHonorRoll] = [(totalScore / subjectCount) > 85];

    return {
      firstName,
      gradeLevel,
      isHonorRoll
    };
  });
};

/**
 * Iterates over the students array using .reduce() to calculate
 * class-wide average scores for math, science, and history.
 *
 * @param {Array} studentList - Array of student records
 * @returns {Object} Object with average scores { math, science, history }
 */
export const getClassSubjectAverages = (studentList = []) => {
  const [students] = [Array.isArray(studentList) ? studentList : (studentList?.students ?? [])];
  const { length: studentCount } = students;

  if (studentCount === 0) {
    return { math: 0, science: 0, history: 0 };
  }

  const { math: totalMath, science: totalScience, history: totalHistory } = students.reduce(
    (acc, { scores }) => {
      const { math: accMath, science: accScience, history: accHistory } = acc;
      const { math, science, history } = scores;
      return {
        math: accMath + math,
        science: accScience + science,
        history: accHistory + history
      };
    },
    { math: 0, science: 0, history: 0 }
  );

  const [mathAvg, scienceAvg, historyAvg] = [
    Math.round((totalMath / studentCount) * 100) / 100,
    Math.round((totalScience / studentCount) * 100) / 100,
    Math.round((totalHistory / studentCount) * 100) / 100
  ];

  return {
    math: mathAvg,
    science: scienceAvg,
    history: historyAvg
  };
};

export default {
  getHonorRoll,
  formatStudentCards,
  getClassSubjectAverages
};
