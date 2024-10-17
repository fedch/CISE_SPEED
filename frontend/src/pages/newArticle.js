import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

const SubmitArticle = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [DOI, setDOI] = useState("");
  const [abstract, setAbstract] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form Submitted", result);

        // Reset the form and set submission state
        setTitle("");
        setAuthor("");
        setPublicationDate("");
        setDOI("");
        setAbstract("");
        setUploadDate("");
        setLink("");
        setSubmitted(true);

        // Optionally redirect to success page
        router.push("/submission-success");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "60px",
        backgroundColor: "#333",
        color: "white",
        minHeight: "100vh", // Page reaches till bottom
      }}
    >
      <h1>Submit an Article</h1>
      {submitted && <p style={{ color: "green" }}>Submission successful!</p>}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Author */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Publication Date */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="publicationDate">Publication Date</label>
          <input
            type="text"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* DOI */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="DOI">DOI</label>
          <input
            type="text"
            id="DOI"
            value={DOI}
            onChange={(e) => setDOI(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Abstract */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
            rows="5"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Upload Date */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="uploadDate">Upload Date</label>
          <input
            type="text"
            id="uploadDate"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Link */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              color: "black",
            }}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              color: "black",
              border: "1px solid #007bff",
              borderRadius: "4px",
              fontSize: "16px",
              backgroundColor: "lightgrey",
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
