import { Link } from 'react-router-dom';

const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map(article => (
                <div>
                    <Link key={article.title} className="article-list-item" to={`/articles/${article.id}`}>
                        <h3>{article.title}</h3>
                        <p>{article.body.substring(0, 150)}...</p>
                    </Link>
                </div>
            ))}
        </>
    );
}

export default ArticlesList;