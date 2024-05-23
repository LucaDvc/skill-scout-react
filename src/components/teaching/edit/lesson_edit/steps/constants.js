import { nanoid } from 'nanoid';

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

const CODE_CHALLENGE_DEFAULT_DESCRIPTION =
  '<p>You can change the problem statement right here and specify the settings below.</p><p>Write a program that finds the sum of two numbers.</p>';
const CODE_CHALLENGE_TEMPLATE_EXAMPLE = `# Python 3.8.1

# Statement: find the sum of 2 numbers

def addTwo(a, b):
    # Learner instruction example: only change this line of code
    return ...  # Placeholder for the learner to fill in

def solution():
    a, b = map(int, input().split())
    c = addTwo(a, b)
    print(c)
    
solution()`;
const CODE_CHALLENGE_PROPOSED_SOLUTION_PLACEHOLDER = `<p>You can write your solution and explanation here, including code snippets:</p>
<pre class="language-python"><code>def addTwo(a, b):
    return a + b</code></pre>`;

const DEFAULT_TEXT_STEP_CONTENT = `<p>You can add text and also images, code examples and much more in this theory step.</p>`;

const DEFAULT_QUIZ_STEP_QUESTION = `<p>You can change the problem statement right here and specify the settings below.</p>
<p></p>
<p>What is 1004 divided by 2?</p>`;
const DEFAULT_QUIZ_STEP_EXPLANATION = `<p>You can write the explanation of the answer here.</p>`;
const DEFAULT_QUIZ_STEP_CHOICES = [
  { id: nanoid(), text: '52', correct: false },
  { id: nanoid(), text: '502', correct: true },
  { id: nanoid(), text: '520', correct: false },
  { id: nanoid(), text: '504', correct: false },
];

const DEFAULT_SORTING_PROBLEM_STATEMENT = `<p>You can change the problem statement right here and specify the settings below.</p>`;
const DEFAULT_SORTING_PROBLEM_OPTIONS = [
  { id: nanoid(), text: 'One', correct_order: 1 },
  { id: nanoid(), text: 'Two', correct: 2 },
  { id: nanoid(), text: 'Three', correct: 3 },
];

const stepsEditConstants = {
  EDITOR_PLUGINS,
  EDITOR_TOOLBAR,
  EDITOR_CONTENT_STYLE,
  EDITOR_CODESAMPLE_LANGUAGES,
  CODE_CHALLENGE_DEFAULT_DESCRIPTION,
  CODE_CHALLENGE_TEMPLATE_EXAMPLE,
  CODE_CHALLENGE_PROPOSED_SOLUTION_PLACEHOLDER,
  DEFAULT_TEXT_STEP_CONTENT,
  DEFAULT_QUIZ_STEP_QUESTION,
  DEFAULT_QUIZ_STEP_EXPLANATION,
  DEFAULT_QUIZ_STEP_CHOICES,
  DEFAULT_SORTING_PROBLEM_STATEMENT,
  DEFAULT_SORTING_PROBLEM_OPTIONS,
};

export default stepsEditConstants;
