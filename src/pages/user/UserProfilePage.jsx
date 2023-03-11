import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment/moment";
import { Grid, Typography, Avatar } from "@mui/material";
import { RecetaLayout } from "../../layouts";
import { useGetUsersMutation } from "../../store/api";

import { RecetaCard } from "../../components";
import { useReceta } from "../../hooks";

export const UserProfilePage = () => {
  const { username: usernameByParams } = useParams();
  const { state: usernameById } = useLocation();
  const username = usernameById || usernameByParams;

  const [getUser, { isLoading, isError }] = useGetUsersMutation();
  const [user, setUser] = useState({});

  const { startGetRecetasByUser, userRecetasStatus } = useReceta();
  const {
    data: recetas = [],
    isLoading: recetaLoading,
    // isError: recetaError,
  } = userRecetasStatus;

  const [avatar, setAvatar] = useState("");
  let storageUrl = process.env.REACT_APP_API_URL_STORAGE;

  const DateFormated = moment(user?.createdAt).fromNow();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getUser(username)
        .unwrap()
        .then(({ usuarios: dataUser }) => {
          setUser(dataUser);
          setAvatar(`${storageUrl}/${dataUser.avatar}`);
          startGetRecetasByUser(username);
        });
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (isError) {
    return (
      <RecetaLayout>
        <h3>profile load failed!</h3>
      </RecetaLayout>
    );
  }

  if (isLoading || !user) {
    return (
      <RecetaLayout>
        <h3>loading... profile</h3>
      </RecetaLayout>
    );
  }

  return (
    <RecetaLayout>
      <Grid container spacing={2} sx={{ boxShadow: 3, borderRadius: "10px" }}>
        <Grid item xs={11} md={6} lg={5}>
          <Avatar
            src={avatar}
            sx={{
              width: "275px",
              height: "275px",
              maxHeight: "100%",
              maxWidth: "100%",
              minWidth: "30%",
              minHeight: "30%",
            }}
          />
          <Typography>{user.username}</Typography>
          {/* <Typography>{user.firstname}</Typography>
          <Typography>{user.lastname}</Typography> */}
          <Typography>Member {DateFormated}</Typography>
        </Grid>
        {recetaLoading || recetas.length < 1 ? (
          <Grid item xs={12} md={6} lg={7}>
            <Typography>LOADING....</Typography>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={6} lg={7}>
              <Typography>
                momentaneo... Todo... Receta most popular of user
              </Typography>

              <RecetaCard receta={recetas[0]} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {recetas.map((receta) => (
                <RecetaCard key={receta._id} receta={receta} />
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </RecetaLayout>
  );
};
