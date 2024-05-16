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
  'codesample',
];

const EDITOR_TOOLBAR =
  'undo redo | blocks | bold italic underline strikethrough | checklist numlist bullist | align  indent outdent | tinycomments | link image table mergetags emoticons charmap codesample | removeformat';

const EDITOR_CODESAMPLE_LANGUAGES = [
  { text: 'HTML/XML', value: 'markup' },
  { text: 'JavaScript', value: 'javascript' },
  { text: 'CSS', value: 'css' },
  { text: 'PHP', value: 'php' },
  { text: 'Ruby', value: 'ruby' },
  { text: 'Python', value: 'python' },
  { text: 'Java', value: 'java' },
  { text: 'C', value: 'c' },
  { text: 'C#', value: 'csharp' },
  { text: 'C++', value: 'cpp' },
];

const EDITOR_CONTENT_STYLE =
  'body { font-family:Public Sans,sans-serif; font-size:16px }';

const stepsEditConstants = {
  EDITOR_PLUGINS,
  EDITOR_TOOLBAR,
  EDITOR_CONTENT_STYLE,
  EDITOR_CODESAMPLE_LANGUAGES,
};

export default stepsEditConstants;
