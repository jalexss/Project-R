import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useGetCommentsByRecetaIdMutation } from "../../../store/api";
import { Comment } from "./Comment";
import { CreateComment } from "./CreateComment";
import { NoComments } from "./NoComments";
import { useParams } from "react-router-dom";
import { CommentContext } from "../../../context/CommentContext";

export const ListComments = () => {
  const { recetaId } = useParams();
  const [getComments, getCommentsStatus] = useGetCommentsByRecetaIdMutation();
  const { isError, isLoading } = getCommentsStatus;

  const [previewComments, setPreviewComments] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [maxPagination, setMaxPagination] = useState(1);

  const resetCommentList = () => {
    getComments({ recetaId, pagination: 1 })
      .unwrap()
      .then(({ comments, maxPagination }) => {
        setPreviewComments([...comments]);
        setPagination(1);
        setMaxPagination(maxPagination);
      });
  };

  const onNextComments = () => {
    getComments({ recetaId, pagination: pagination + 1 })
      .unwrap()
      .then(({ comments, maxPagination }) => {
        setPagination(pagination + 1);
        setPreviewComments([...previewComments, ...comments]);
        setMaxPagination(maxPagination);
      });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getComments({ recetaId, pagination })
        .unwrap()
        .then(({ comments, maxPagination }) => {
          setPreviewComments([...previewComments, ...comments]);
          setMaxPagination(maxPagination);
        });
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (isError) {
    return <h3>Error: comments load failed!</h3>;
  }

  if (isLoading) {
    return <h3>loading... comments</h3>;
  }

  return (
    <CommentContext.Provider value={{ resetCommentList }}>
      <Grid
        item
        xs={12}
        sx={{
          mt: 3,
        }}
      >
        <CreateComment
          recetaId={recetaId}
          resetCommentList={resetCommentList}
        />

        {previewComments.length > 0 ? (
          previewComments.map((comment) => (
            <Comment
              recetaId={recetaId}
              key={comment._id}
              comment={comment}
              resetCommentList={resetCommentList}
            />
          ))
        ) : (
          <NoComments />
        )}
        {pagination < maxPagination && (
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: "6rem",
            }}
            onClick={onNextComments}
          >
            Load more recetas
          </Button>
        )}
      </Grid>
    </CommentContext.Provider>
  );
};
