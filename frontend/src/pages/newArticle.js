import { useState } from 'react';

const SubmitArticle = () => {
  const [articleName, setArticleName] = useState('');
  const [articleLink, setArticleLink] = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      articleName,
      articleLink,
      evidenceLink,
      synopsis,
    };

    // Simulate form submission (e.g., send to backend)
    console.log('Form Submitted', submissionData);

    // Reset the form and set submission state
    setArticleName('');
    setArticleLink('');
    setEvidenceLink('');
    setSynopsis('');
    setSubmitted(true);
  };

  return ( // Splitting Div, because the standard globals.css is bad, this is a temporary styling 
    <div style=
    {{  margin: 'auto', padding: '60px',  
        backgroundColor: 'deepskyblue',
        color: 'black',
        minHeight: '100vh' }} // Page reaches till bottom. It's blue, because blue is nice.
    >
      <h1>Submit an Article</h1>
      {submitted && <p style={{ color: 'green' }}>Submission successful!</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="articleName">Article Name</label>
          <input
            type="text"
            id="articleName"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="articleLink">Article Link</label>
          <input
            type="url"
            id="articleLink"
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="evidenceLink">Evidence Link (optional)</label>
          <input
            type="url"
            id="evidenceLink"
            value={evidenceLink}
            onChange={(e) => setEvidenceLink(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="synopsis">Article Synopsis</label>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
            rows="5"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div> 
          <button type="submit" style={{ // The submission button.
            padding: '10px 20px', 
            cursor: 'pointer',
            color: 'black',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            backgroundColor: 'lightgrey' }}>
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitArticle;
