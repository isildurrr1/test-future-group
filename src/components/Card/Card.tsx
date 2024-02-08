import './Card.sass';

const Card = () => {
  return (
    <div className="card">
      <div className="card-cover" />
      <div className="card-info">
        <div className="card-categories">Computers</div>
        <div className="card-title">Node.js Разработка
          серверных веб-приложений на JavaScript</div>
        <div className="card-author">Дэвид Хэррон</div>
      </div>
    </div>
  )
}

export default Card;