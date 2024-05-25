const COURSE_DESCRIPTION_PLACEHOLDER =
  '<h2>Write here everything that is important for learners to know before they join the course.</em></h2><h3><em>Say a few words about:</h3><ul><li style="font-style: italic;"><em>course goal</em></li><li style="font-style: italic;"><em>why a learner should choose this particular course</em></li><li style="font-style: italic;"><em>what skills learners will acquire after they passed the course</em></li><li style="font-style: italic;"><em>what special characteristics the course has</em></li><li style="font-style: italic;"><em>what activities the course includes</em></li><li style="font-style: italic;"><em>what sections and assignments there are in the course</em></li></ul>';

const COURSE_REQUIREMENTS_PLACEHOLDER =
  '<p>What learners will need to know before they join the course. This information is useful to understand whether this course is too difficult or too easy.</p>';

const EDITOR_PLUGINS = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'wordcount',
];

const EDITOR_TOOLBAR =
  'undo redo | blocks | bold italic underline strikethrough | checklist numlist bullist | align  indent outdent | tinycomments | link image table mergetags emoticons charmap | removeformat';

const EDITOR_CONTENT_STYLE =
  'body { font-family:Public Sans,sans-serif; font-size:16px }';

const informationTabConstants = {
  COURSE_DESCRIPTION_PLACEHOLDER,
  EDITOR_PLUGINS,
  EDITOR_TOOLBAR,
  EDITOR_CONTENT_STYLE,
  COURSE_REQUIREMENTS_PLACEHOLDER,
};

export default informationTabConstants;
