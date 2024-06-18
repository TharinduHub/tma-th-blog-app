import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createPost, updatePost } from '../graphql/mutations';
import { Alert } from '@aws-amplify/ui-react';

const client = generateClient();

const AddArticleForm = ({ articleInfo, articleAdded }) => {
    const [title, setTitle] = useState(articleInfo?.title);
    const [body, setBody] = useState(articleInfo?.body);

    const addArticle = async () => {
        console.log(articleInfo)
        if (articleInfo) {
            console.log(articleInfo)
            const article = {
                id: articleInfo.id,
                title: title,
                body: body
            };
            const { data, error } = await client.graphql({
                query: updatePost,
                variables: { input: article },
                authMode: 'apiKey'
            });
            if (error) {
                console.error(error);
                return Alert("Error on Updating!")
            }
        }
        else {
            const article = {
                title: title,
                body: body
            };
            const { data, error } = await client.graphql({
                query: createPost,
                variables: { input: article },
                authMode: 'apiKey'
            });
            if (error) {
                console.error(error);
                return Alert("Error on Adding!")
            }
        }
        articleAdded(true);
    }

    return (
        <div id="add-comment-form">
            <form onSubmit={addArticle}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        rows="12"
                        cols="50" />
                </div>
                <div id='add-comment-form-action'>
                    <button type="submit">{articleInfo ? 'Update' : 'Add Article'}</button>
                    <button onClick={() => articleAdded(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddArticleForm;