import { useState } from 'react';

function App() {
  const [titleField, setTitleField] = useState('');
  const [articleList, setArticleList] = useState([]);

  const handleInsertPostSubmit = (e) => {
    e.preventDefault();

    // console.log(titleField);
    // console.log(articleList);

    if (!titleField) return;

    const newArticle = {
      title: titleField,
    };

    setArticleList([...articleList, newArticle]);
    setTitleField('');
  };

  const handleTitleChange = (e) => {
    setTitleField(e.target.value);
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
          <form onSubmit={handleInsertPostSubmit}>
            <h2>Insert form</h2>
            <div className="row">
              <div className="col-3">
                <label className="form-label" htmlFor="post-title">
                  Titolo
                </label>
                <input
                  value={titleField}
                  onChange={handleTitleChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-title"
                />
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
