import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import authorImage from "../assets/sobre.jpeg";
import Title from "./Title";
import Button from "./Button";

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  likes: number;
  profileImage: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="p-4 rounded flex flex-col">
      {" "}
      {/* Adicione 'flex-col' para permitir a quebra de linha */}
      <div className="flex items-start mb-2">
        <img
          className="rounded-full w-8 h-8 mr-4"
          src={comment.profileImage}
          alt={`Imagem de perfil de ${comment.author}`}
        />
        <div>
          <strong>{comment.author}</strong>: {comment.text}
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <small className="text-xs">{comment.date}</small>
        <span className="ml-3 flex items-center">
          <IoHeart className="text-red-500 text-xl mr-1" /> {comment.likes}
        </span>
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState({ author: "", text: "" });
  const [simulatedComments, setSimulatedComments] = useState(comments);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({ ...prevComment, [name]: value }));
  };

  const handleAddComment = () => {
    if (newComment.author && newComment.text) {
      const updatedComments = [
        ...simulatedComments,
        {
          ...newComment,
          id: simulatedComments.length + 1,
          date: new Date().toLocaleString(),
          likes: 0,
          profileImage: authorImage,
        },
      ];
      setSimulatedComments(updatedComments);
      setNewComment({ author: "", text: "" });
    }
  };

  return (
    <div className="flex flex-col gap-y-4 pt-[20px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto border-t border-primaryBgBorder">
      <Title bold center={false} green={false} message="Seção de Comentários" />
      <div className="flex flex-col-reverse w-full md:w-3/5">
        <div className="space-y-4">
          {simulatedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        <div className="flex items-start mb-3">
          <img
            className="rounded-3xl w-20 h-20 mr-4"
            src={authorImage}
            alt="Imagem do autor"
          />
          <div className="relative w-full">
            <textarea
              name="text"
              placeholder="Escreva seu comentário..."
              className="w-full p-2 rounded-lg bg-primaryBgBorder outline-none text-sm shadow-lg"
              rows={4}
              value={newComment.text}
              onChange={handleInputChange}
            />
            <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end ">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-end gap-2">
                <Button
                  green={false}
                  onlyBorder
                  small
                  onClick={() => setNewComment({ author: "", text: "" })}
                >
                  {" "}
                  Cancelar
                  <FaTimes className="ml-2" />
                </Button>
                <Button
                  green
                  onlyBorder={false}
                  small
                  onClick={handleAddComment}
                >
                  Enviar Comentário
                  <FaPaperPlane className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
