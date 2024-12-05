import { useState } from 'react';

const possibleTags = ['HTML', 'CSS', 'JS'];

const defaultPostFields = {
  title: '',
  author: '',
  description: '',
  published: false,
  tags: [],
};

function App() {
  const [formFields, setFormFields] = useState(defaultPostFields);
  const [articleList, setArticleList] = useState([]);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!formFields.title) return;
    if (!formFields.author) return;

    const newArticle = { ...formFields };

    setArticleList([...articleList, newArticle]);
    setFormFields(defaultPostFields);
  };

  const handleFormChange = (e) => {
    const newFormFields = {
      ...formFields,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    setFormFields(newFormFields);
    console.log(newFormFields);
  };

  const handleFormTagsChange = (e) => {
    let newTags = e.target.checked
      ? [...formFields.tags, e.target.value]
      : formFields.tags.filter((tag) => tag != e.target.value);

    const newFormFields = { ...formFields, tags: newTags };
    setFormFields(newFormFields);
  };

  const deletePost = (deleteIndex) => {
    const newArticleList = articleList.filter((article, articleIndex) => articleIndex !== deleteIndex);
    setArticleList(newArticleList);
  };

  return (
    <>
      <div className="container">
        {/* INSERT POST FORM SECTION */}
        <section className="py-4">
          <form onSubmit={handlePostSubmit}>
            <h2>Insert form</h2>
            <div className="row g-3">
              <div className="col-3">
                <label className="form-label" htmlFor="post-title">
                  Titolo
                </label>
                <input
                  value={formFields.title}
                  onChange={handleFormChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-title"
                  name="title"
                />
              </div>

              <div className="col-3">
                <label className="form-label" htmlFor="post-author">
                  Autore
                </label>
                <input
                  value={formFields.author}
                  onChange={handleFormChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-author"
                  name="author"
                />
              </div>

              <div className="col-3">
                <label className="form-label" htmlFor="post-description">
                  Description
                </label>
                <input
                  value={formFields.description}
                  onChange={handleFormChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-description"
                  name="description"
                />
              </div>

              <div className="col-3">
                <label className="form-label" htmlFor="post-published">
                  Pubblicato
                </label>
                <div>
                  <input
                    checked={formFields.published}
                    onChange={handleFormChange}
                    type="checkbox"
                    id="post-published"
                    name="published"
                  />
                </div>
              </div>

              <div className="col-3">
                <label className="form-label">Tags</label>

                {possibleTags.map((tag, index) => (
                  <div key={index}>
                    <label>
                      <input
                        checked={formFields.tags.includes(tag)}
                        onChange={handleFormTagsChange}
                        type="checkbox"
                        name="post-tag"
                        value={tag}
                        className="me-2"
                      />
                      {tag}
                    </label>
                  </div>
                ))}
              </div>

              <div className="col-12">
                <button className="btn btn-success">Crea post</button>
              </div>
            </div>
          </form>
        </section>
        <hr />
        {/* LIST POST SECTION  */}
        <section className="py-4">
          <h2>Post list</h2>
          <div className="row row-cols-3 g-3">
            {articleList.length ? (
              articleList.map((article, index) => (
                <div key={index} className="col">
                  <div className="card">
                    <button onClick={() => deletePost(index)} type="button" className="btn-close"></button>
                    <div className="card-body">
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      {article.tags.map((tag) => (
                        <span className="badge rounded-pill text-bg-primary me-2">{tag}</span>
                      ))}

                      {/* title: '',
                      author: '',
                      description: '',
                      published: false,
                      tags: [], */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <h3>Nessun articolo disponibile</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
