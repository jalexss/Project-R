import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateRecetaMutation,
  useDeleteRecetaMutation,
  useGetRecetaByIdMutation,
  useGetRecetasByUserMutation,
  useGetRecetasMutation,
  useUpdateRecetaMutation,
  useUploadImagesMutation,
} from "../store/api";

export const useReceta = () => {
  const navigate = useNavigate();

  const [getRecetas, getRecetasStatus] = useGetRecetasMutation();
  const [getRecetaById, recetaByIdStatus] = useGetRecetaByIdMutation();
  const [recetaDelete, recetaDeleteStatus] = useDeleteRecetaMutation();
  const [uploadImages, uploadImagesStatus] = useUploadImagesMutation();
  const [updateReceta, updateStatus] = useUpdateRecetaMutation();
  const [createReceta, createStatus] = useCreateRecetaMutation();
  const [getUserRecetas, userRecetasStatus] = useGetRecetasByUserMutation();

  const startGetRecetas = (paginationNumber = 1) => {
    const result = getRecetas({ pagination: paginationNumber })
      .unwrap()
      .then(({ recetas, maxPagination, ok }) => {
        return { recetas, maxPagination, ok };
      });
    return result;
  };

  const startGetRecetaById = (recetaId) => {
    const result = getRecetaById(recetaId)
      .unwrap()
      .then((receta) => {
        return receta;
      });
    return result;
  };

  const startDeleteRecetaById = (recetaId) => {
    recetaDelete(recetaId)
      .unwrap()
      .then(() => {
        // alert("delete Successfully!");
        console.log("RECETA BORRADA!");
        return navigate("/", { replace: true });
      })
      .catch(() => {
        return console.log("ERROR AL BORRAR RECETA");
      });
  };

  const startUploadImages = (data, recetaId) => {
    const imagesData = new FormData();

    if (data.images.length > 0) {
      Object.values(data.images).forEach((el) =>
        imagesData.append("images", el)
      );
    }

    uploadImages({ recetaId, imagesData })
      .unwrap()
      //TODO CAMBIR POR UN SNACKBAR O ALGO CON UN MENSAJE DE RETROALIMENTACION
      //fulfilled tiene ok: true y msg: receta creada correctamente
      .then((fulfilled) => {
        navigate("/myRecetas", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startCreateReceta = (data) => {
    createReceta(data);
  };

  const startUpdateReceta = ({ recetaId, data }) => {
    updateReceta({ recetaId, ...data });
  };

  const startGetRecetasByUser = (usernameOrId) => {
    getUserRecetas(usernameOrId);
  };

  return {
    //Propertys
    getRecetasStatus,
    recetaByIdStatus,
    recetaDeleteStatus,
    uploadImagesStatus,
    updateStatus,
    createStatus,
    userRecetasStatus,

    //methods
    startGetRecetas,
    startGetRecetaById,
    startDeleteRecetaById,
    startUploadImages,
    startUpdateReceta,
    startCreateReceta,
    startGetRecetasByUser,
  };
};
