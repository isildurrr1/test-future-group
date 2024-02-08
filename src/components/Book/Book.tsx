import './Book.sass';

const Book = () => {
  return (
    <div className='book'>
      <div className="book-cover">
        <div className="book-image" />
      </div>
      <div className="book-discription">
        <div className="book-categories">Art/General</div>
        <div className="book-title">Node.js Разработка
          серверных веб-приложений на JavaScript</div>
        <div className="book-author">Дэвид Хэррон</div>
        <div className="book-annotation">An open score edition Bach's Goldberg
          Variations</div>
      </div>
    </div>
  )
}

export default Book;