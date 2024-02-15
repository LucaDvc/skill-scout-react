import DOMPurify from 'dompurify';

function HtmlContent({ html }) {
  const safeHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default HtmlContent;
