import React from "react";

const Comment = (props) => {
  return (
    <div>
      <article className="p-6 mb-6 text-base bg-white border rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              {props.author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                {props.date}
              </time>
            </p>
          </div>
          <button>Delete</button>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{props.comment}</p>
      </article>
    </div>
  );
};

export default Comment;
