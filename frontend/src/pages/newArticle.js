import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

const SubmitArticle = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [DOI, setDOI] = useState('');
  const [abstract, setAbstract] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [link, setLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      title,
      author,
      publicationDate,
      DOI,
      abstract,
      uploadDate,
      link,
    };

    // Simulate form submission (e.g., send to backend)
    console.log('Form Submitted', submissionData);

    // Reset the form and set submission state
    setTitle('');
    setAuthor('');
    setPublicationDate('');
    setDOI('');
    setAbstract('');
    setUploadDate('');
    setLink('');
    setSubmitted(true);

    // Navigate to another page after submission
    router.push('/submission-success'); // Redirect to the 'submission-success' page
  };

  return (
    <div style={{ 
      margin: 'auto', 
      padding: '60px',  
      backgroundColor: 'deepskyblue',
      color: 'black',
      minHeight: '100vh' // Page reaches till bottom
    }}>
      <h1>Submit an Article</h1>
      {submitted && <p style={{ color: 'green' }}>Submission successful!</p>}
      <form onSubmit={handleSubmit}>
        
        {/* Title */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Author */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Publication Date */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="publicationDate">Publication Date</label>
          <input
            type="text"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* DOI */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="DOI">DOI</label>
          <input
            type="text"
            id="DOI"
            value={DOI}
            onChange={(e) => setDOI(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Abstract */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
            rows="5"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Upload Date */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="uploadDate">Upload Date</label>
          <input
            type="text"
            id="uploadDate"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Link */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Submit Button */}
        <div> 
          <button 
            type="submit" 
            style={{ 
              padding: '10px 20px', 
              cursor: 'pointer',
              color: 'black',
              border: '1px solid #007bff',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: 'lightgrey'
            }}
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitArticle;
