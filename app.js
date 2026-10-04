/**
 * Student Record Manager - Application Controller & View Renderer
 * Strictly adheres to functional programming guidelines:
 * - Array and object destructuring for variable assignments and function parameters
 * - Exclusively relies on .map(), .filter(), and .reduce() (no for, for...of, or forEach)
 * - Pure modular functions utilizing ES6 arrow syntax
 */

import {
  getHonorRoll,
  formatStudentCards,
  getClassSubjectAverages
} from './dataProcessor.js';

/**
 * 10 mock student records dataset
 */
export const students = [
  {
    id: 1,
    name: 'Aria Montgomery',
    gradeLevel: 11,
    subjects: ['Math', 'Science', 'History', 'Literature'],
    scores: { math: 94, science: 89, history: 92 }
  },
  {
    id: 2,
    name: 'Liam Chen',
    gradeLevel: 10,
    subjects: ['Math', 'Science', 'History', 'Computer Science'],
    scores: { math: 98, science: 95, history: 84 }
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    gradeLevel: 12,
    subjects: ['Math', 'Science', 'History', 'Art'],
    scores: { math: 85, science: 91, history: 96 }
  },
  {
    id: 4,
    name: 'Marcus Vance',
    gradeLevel: 9,
    subjects: ['Math', 'Science', 'History', 'Physical Education'],
    scores: { math: 78, science: 82, history: 80 }
  },
  {
    id: 5,
    name: 'Elena Rostova',
    gradeLevel: 11,
    subjects: ['Math', 'Science', 'History', 'Economics'],
    scores: { math: 91, science: 94, history: 89 }
  },
  {
    id: 6,
    name: 'Devon Patel',
    gradeLevel: 10,
    subjects: ['Math', 'Science', 'History', 'Robotics'],
    scores: { math: 88, science: 90, history: 85 }
  },
  {
    id: 7,
    name: 'Chloe Kim',
    gradeLevel: 12,
    subjects: ['Math', 'Science', 'History', 'Psychology'],
    scores: { math: 96, science: 93, history: 98 }
  },
  {
    id: 8,
    name: 'Jamal Washington',
    gradeLevel: 9,
    subjects: ['Math', 'Science', 'History', 'Music'],
    scores: { math: 82, science: 79, history: 88 }
  },
  {
    id: 9,
    name: 'Amara Okafor',
    gradeLevel: 11,
    subjects: ['Math', 'Science', 'History', 'Biology'],
    scores: { math: 90, science: 96, history: 91 }
  },
  {
    id: 10,
    name: 'Noah Bennett',
    gradeLevel: 10,
    subjects: ['Math', 'Science', 'History', 'Philosophy'],
    scores: { math: 74, science: 81, history: 86 }
  }
];

/**
 * Calculates average score across subjects using object destructuring and reduce.
 */
export const calculateAverageScore = ({ math, science, history }) => {
  const [scoresList] = [[math, science, history]];
  const [totalSum, subjectCount] = [
    scoresList.reduce((acc, curr) => acc + curr, 0),
    scoresList.length
  ];
  return Math.round((totalSum / subjectCount) * 10) / 10;
};

/**
 * Generates subject badge markup using map.
 */
export const renderSubjectBadges = ({ subjects = [] }) =>
  subjects
    .map((subject) => `<span class="badge badge-subject">${subject}</span>`)
    .join('');

/**
 * Generates card markup for a single student.
 */
export const renderStudentCard = ({ id, name, gradeLevel, subjects, scores }) => {
  const { math, science, history } = scores;
  const [average] = [calculateAverageScore({ math, science, history })];
  const [isHonor] = [average > 85];
  const [initials] = [
    name
      .split(' ')
      .map(([char]) => char)
      .join('')
  ];
  const [badgesMarkup] = [renderSubjectBadges({ subjects })];

  return `
    <article class="student-card" id="student-${id}" data-id="${id}">
      <header class="card-header">
        <div class="avatar">${initials}</div>
        <div class="header-info">
          <h3 class="student-name">${name}</h3>
          <div style="display: flex; gap: 0.4rem; align-items: center; margin-top: 0.25rem;">
            <span class="badge badge-grade">Grade ${gradeLevel}</span>
            ${isHonor ? '<span class="badge badge-honor">★ Honor Roll</span>' : ''}
          </div>
        </div>
        <div class="score-summary">
          <span class="avg-label">Avg</span>
          <span class="avg-value ${average >= 90 ? 'score-high' : average >= 80 ? 'score-mid' : 'score-low'}">${average}</span>
        </div>
      </header>

      <section class="card-scores">
        <div class="score-pill">
          <span class="score-title">Math</span>
          <span class="score-num">${math}</span>
        </div>
        <div class="score-pill">
          <span class="score-title">Science</span>
          <span class="score-num">${science}</span>
        </div>
        <div class="score-pill">
          <span class="score-title">History</span>
          <span class="score-num">${history}</span>
        </div>
      </section>

      <footer class="card-footer">
        <div class="subjects-list">
          ${badgesMarkup}
        </div>
      </footer>
    </article>
  `;
};

/**
 * Renders the list of student cards to the container.
 */
export const mountStudents = ({ studentList = students, containerId = 'studentGrid' } = {}) => {
  const [container] = [document.getElementById(containerId)];
  if (!container) return;

  const [cardsHtml] = [
    studentList
      .map((student) => renderStudentCard(student))
      .join('')
  ];

  container.innerHTML = cardsHtml;

  const [counterElem] = [document.getElementById('studentCounter')];
  if (counterElem) {
    counterElem.innerHTML = `Displaying <strong>${studentList.length}</strong> records`;
  }
};

/**
 * Populates class metrics from dataProcessor output.
 */
export const mountMetrics = ({ studentList = students } = {}) => {
  const { math, science, history } = getClassSubjectAverages(studentList);
  const [honorRollList] = [getHonorRoll(studentList)];

  const [mathElem] = [document.getElementById('mathAvgValue')];
  const [sciElem] = [document.getElementById('scienceAvgValue')];
  const [histElem] = [document.getElementById('historyAvgValue')];
  const [honorElem] = [document.getElementById('honorCountValue')];

  if (mathElem) mathElem.textContent = `${math}%`;
  if (sciElem) sciElem.textContent = `${science}%`;
  if (histElem) histElem.textContent = `${history}%`;
  if (honorElem) honorElem.textContent = `${honorRollList.length} / ${studentList.length}`;
};

/**
 * Sets up filter interaction using functional mappings.
 */
export const setupFilters = ({ studentList = students } = {}) => {
  const [filterAllBtn] = [document.getElementById('filterAllBtn')];
  const [filterHonorBtn] = [document.getElementById('filterHonorBtn')];

  const handleFilterClick = ({ activeBtn, inactiveBtn, filterType }) => {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');

    const [filteredList] = [
      filterType === 'honor'
        ? getHonorRoll(studentList)
        : studentList
    ];

    mountStudents({ studentList: filteredList, containerId: 'studentGrid' });
  };

  if (filterAllBtn && filterHonorBtn) {
    filterAllBtn.addEventListener('click', () => {
      handleFilterClick({ activeBtn: filterAllBtn, inactiveBtn: filterHonorBtn, filterType: 'all' });
    });

    filterHonorBtn.addEventListener('click', () => {
      handleFilterClick({ activeBtn: filterHonorBtn, inactiveBtn: filterAllBtn, filterType: 'honor' });
    });
  }
};

// Initialize render if running in browser DOM context
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    mountStudents({ studentList: students, containerId: 'studentGrid' });
    mountMetrics({ studentList: students });
    setupFilters({ studentList: students });
  });
}

export {
  getHonorRoll,
  formatStudentCards,
  getClassSubjectAverages
};

export default students;
