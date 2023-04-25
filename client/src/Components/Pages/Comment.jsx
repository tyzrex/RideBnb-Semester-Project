import React from "react";

const Comment = (props) => {
  const stars = () => {
    let stars = [];
    for (let i = 0; i < props.stars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }
    for (let i = 0; i < 5 - props.stars; i++) {
      stars.push(
        <span key={i} className="text-gray-400">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <article className="p-6 mb-6 text-base bg-white border rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              {props.author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time>{props.date}</time>
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 text-3xl cursor-pointer">
            {stars()}
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{props.comment}</p>
      </article>
    </div>
  );
};

export default Comment;
