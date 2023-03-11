import { useState } from "react";
import { useGetCommentsByRecetaIdMutation } from "../store/api";

export const useComment = (recetaId) => {
  const [getComments, commentsStatus] = useGetCommentsByRecetaIdMutation();

  const [previewComments, setPreviewComments] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [maxPagination, setMaxPagination] = useState(1);

  const startGetComments = () => {
    getComments({ recetaId, pagination })
      .unwrap()
      .then(({ comments, maxPagination }) => {
        setPreviewComments([...previewComments, ...comments]);
        setMaxPagination(maxPagination);
      });
  };

  const startNextComments = () => {
    console.log("NexComments", recetaId);
    getComments({ recetaId, pagination: pagination + 1 })
      .unwrap()
      .then(({ comments, maxPagination }) => {
        setPagination(pagination + 1);
        setPreviewComments([...previewComments, ...comments]);
        setMaxPagination(maxPagination);
      });
  };

  const startResetCommentList = () => {
    console.log("ResetCommets", recetaId);
    getComments({ recetaId, pagination: 1 })
      .unwrap()
      .then(({ comments, maxPagination }) => {
        setPreviewComments([...comments]);
        setPagination(1);
        setMaxPagination(maxPagination);
      });
  };

  return {
    // propertys
    previewComments,
    pagination,
    maxPagination,
    commentsStatus,

    // methods
    startGetComments,
    startNextComments,
    startResetCommentList,
  };
};
