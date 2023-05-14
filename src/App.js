import { useEffect, useReducer } from "react";

function App() {
  const postReducer = (state, action) => {
    switch(action.type) {
      case "fetchAllPosts" :
        return {posts: action.payload, post: {}}
      case "fetchSinglePost" :
        return {posts: [], post: action.payload, postId: ''}
      case "changeId" :
        return {...state, postId: action.payload}
        default:
          throw new Error();
    }
  }

  const initialState = {
    posts: [],
    post: {},
    postId: ''
  }

  const [state, dispatch] = useReducer(postReducer, initialState)

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    dispatch({type: "fetchAllPosts", payload: data})
  }

  const searchById = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${state.postId}`);
    const data = await response.json();
    dispatch({type: "fetchSinglePost", payload: data})
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(state.postId);
  console.log(state.post);

  return (
    <div className="App">
      <div className='box'>
        <h2 className="title" onClick={() => fetchData()}>JSON Posts</h2>
            <div className='input-box'>
                <form onSubmit={searchById}>
                  <input type="number" placeholder='Search By Post ID' value={state.postId} onChange={(e) => dispatch({type: "changeId", payload: e.target.value})}/>
                  <button className='search-btn'>Search</button>
                </form>
            </div>
    </div>
        <div className='post-box'>
            {
                state.posts.length > 0 ?
                state.posts.map(post => (
                        <div className='post' key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                )) :
                <div className='post'>
                    <h4>{state.post.title}</h4>
                    <p>{state.post.body}</p>
                </div>
            }   
        </div>
    </div>
  );
}

export default App;
