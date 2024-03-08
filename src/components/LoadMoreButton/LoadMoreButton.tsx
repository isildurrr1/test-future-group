import { LoadMoreButtonProps } from '../../types/types';
import './LoadMoreButton.sass';
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onLoadMoreClick, load }) => {
  const handleClick = () => onLoadMoreClick()
  return (
    <>
      {!load && <button className="loadButton" onClick={handleClick}>Load more</button>}
    </>
  )
}

export default LoadMoreButton;