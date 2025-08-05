function FeedPage() {
    return (
        <div className='box page'>
            <h4>Page</h4>
            <ul style={{listStylePosition: 'inside'}}>
                {[...new Array(10)].map((item, index) => {
                    const postId = index + 1;

                    return (
                        <li key={postId}>
                            <a href={`/posts/${postId}`}>Post {postId}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FeedPage;