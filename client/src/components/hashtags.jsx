export default function Hashtags(props) {
  function handleDelete(i) {
    const tempArray = props.hashtags;
    tempArray.splice(i, 1);
    props.setHashtags([...tempArray]);
  }

  const hashtags = props.hashtags.map((hashtag, i) => (
      <div className="border border-black px-2 pt-1 rounded shadow flex mx-1">

<button
      key={i}
      className="mb-1"
    >
      #{hashtag}
      
    </button>
    <button
        onClick={() => {
          handleDelete(i);
        }}
        className="transform ml-2 text-red-600 hover:scale-125"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      </div>
    
  ));

  return (
    <div className="flex flex-wrap justify-center items-center mt-4">
      {hashtags}
    </div>
  );
}
