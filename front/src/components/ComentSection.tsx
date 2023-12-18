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
        <small className="text-sm">{comment.date}</small>
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
    <div className="w-6/12 mx-auto mt-10 flex flex-col gap-y-4">
      {/* <h2 className="text-2xl font-semibold mb-6">Seção de comentários</h2> */}
      <Title bold center={false} green={false} message="Seção de Comentários" />
      <div className="flex flex-col-reverse">
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
              className="w-full p-2 rounded bg-[#181818] outline-none mb-2"
              rows={4}
              value={newComment.text}
              onChange={handleInputChange}
            />
            <div className="flex items-center justify-end space-x-2">
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
  );
};

export default CommentSection;
