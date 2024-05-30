import { useSelector } from 'react-redux';

export const useCourseChecklist = () => {
  const { course } = useSelector((state) => state.teaching.edit);

  const checkTwoModules = course?.chapters?.length >= 2;

  const lessonsNumber =
    course?.chapters?.reduce((acc, chapter) => acc + chapter.lessons.length, 0) || 0;

  let assignmentsNumber = 0;
  if (course?.chapters) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter?.lessons || []) {
        for (const step of lesson.lesson_steps || []) {
          if (
            step.type === 'quiz' ||
            step.type === 'codechallenge' ||
            step.type === 'sorting_problem' ||
            step.type === 'text_problem'
          ) {
            assignmentsNumber++;
          }
        }
      }
    }
  }

  const checkEmptyModules =
    course?.chapters?.length > 0 &&
    course.chapters.every((chapter) => chapter.lessons.length > 0);

  let checkAllVideos = true;
  if (course?.chapters) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter?.lessons || []) {
        for (const step of lesson.lesson_steps || []) {
          if (step.type === 'video' && !step.video_file) {
            checkAllVideos = false;
            break;
          }
        }
      }
    }
  }

  const checkLogoUploaded =
    course?.image !==
    'https://courses-platform-bucket.s3.amazonaws.com/courses/images/default.jpg';

  const checkSummary = course?.intro?.length > 100;

  const checkCategory = !!course?.category;

  const pointsCheckedNumber =
    (checkTwoModules ? 1 : 0) +
    (lessonsNumber >= 10 ? 1 : 0) +
    (assignmentsNumber >= 10 ? 1 : 0) +
    (checkEmptyModules ? 1 : 0) +
    (checkAllVideos ? 1 : 0) +
    (checkLogoUploaded ? 1 : 0) +
    (checkSummary ? 1 : 0) +
    (checkCategory ? 1 : 0);

  return {
    atLeastTwoModules: checkTwoModules,
    atLeastTenLessons: lessonsNumber >= 10,
    atLeastTenAssignments: assignmentsNumber >= 10,
    noEmptyModules: checkEmptyModules,
    allVideosUploaded: checkAllVideos,
    logoUploaded: checkLogoUploaded,
    summaryMoreThan100: checkSummary,
    categorySelected: checkCategory,
    pointsCheckedNumber,
    lessonsNumber,
    assignmentsNumber,
    courseReady: pointsCheckedNumber === 8,
  };
};
