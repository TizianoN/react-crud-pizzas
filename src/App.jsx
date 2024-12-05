import { useState } from 'react';

function App() {
  const [titleFieldInsert, setTitleFieldInsert] = useState('');
  const [titleFieldEdit, setTitleFieldEdit] = useState('');
  const [articleList, setArticleList] = useState([]);
  const [postEditIndex, setPostEditIndex] = useState();

  // # INSERT POST
  const handleInsertPostSubmit = (e) => {
    e.preventDefault();

    if (!formFields.title) return;
    if (!formFields.author) return;

    if (!titleFieldInsert) return;

    const newArticle = {
      title: titleFieldInsert,
    };

    setArticleList([...articleList, newArticle]);
    setTitleFieldInsert('');
  };

  const handleInsertTitleChange = (e) => {
    setTitleFieldInsert(e.target.value);
  };

  // # EDIT POST
  const handleEditPostSubmit = (e) => {
    e.preventDefault();

    console.log(titleFieldEdit);
    console.log(postEditIndex);

    if (!titleFieldEdit) return;
    if (!postEditIndex) return;

    const newArticleList = [...articleList];
    newArticleList[postEditIndex].title = titleFieldEdit;
    setArticleList(newArticleList);
  };

  const handleChangePostEdit = (e) => {
    setPostEditIndex(e.target.value);
  };

  const handleEditTitleChange = (e) => {
    setTitleFieldEdit(e.target.value);
  };

  // # DELETE POST
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
            <h2>Inserisci nuovo post</h2>
            <div className="row">
              <div className="col-3">
                <label className="form-label" htmlFor="post-title">
                  Titolo
                </label>
                <input
                  value={titleFieldInsert}
                  onChange={handleInsertTitleChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-title"
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success">Modifica</button>
              </div>
            </div>
          </form>
        </section>
        <hr />
        {/* EDIT POST FORM SECTION */}
        <section className="py-4">
          <form onSubmit={handleEditPostSubmit}>
            <h2>Modifica post</h2>
            <div className="row">
              <div className="col-3">
                <label className="form-label" htmlFor="post-selection">
                  Seleziona post
                </label>
                <select onChange={handleChangePostEdit} className="form-select" id="post-selection">
                  <option value="">Seleziona un post</option>
                  {articleList.map((article, index) => (
                    <option value={index}>{article.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-3">
                <label className="form-label" htmlFor="post-title">
                  Titolo
                </label>
                <input
                  value={titleFieldEdit}
                  onChange={handleEditTitleChange}
                  type="text"
                  className="form-control mb-3"
                  id="post-title"
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success">Modifica</button>
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
