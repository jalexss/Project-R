import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Link,
  Button,
  Stack,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import { DeleteUserButton, EditButton } from "../button";
import { useUpdateUserMutation } from "../../../store/api";

let avatarUrl = `${process.env.REACT_APP_API_URL}/storage`;

export const UsersTable = ({ getUsers, usersStatus }) => {
  const { data, isLoading } = usersStatus;
  const [users, setUsers] = useState([]);
  const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

  console.log(users);

  const onRoleUpdated = (userId, newRole) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUserInRole = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    updateUser({ userId, data: { role: newRole } })
      .unwrap()
      .then(() => {
        setUsers(updatedUserInRole);
        // getUsers();
      })
      .catch((error) => {
        console.log(error);
        setUsers(previousUsers);
      });
  };

  const onStatusUpdated = (userId, newStatus) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUserInStatus = users.map((user) => ({
      ...user,
      status: userId === user._id ? newStatus : user.status,
    }));

    updateUser({ userId, data: { status: newStatus } })
      .unwrap()
      .then(() => {
        setUsers(updatedUserInStatus);
      })
      .catch((error) => {
        console.log(error);
        setUsers(previousUsers);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "edit",
      headerName: "Edit / Delete",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <Grid
            direction="row"
            container
            width="100%"
            justifyContent="space-between"
            spacing={1}
          >
            <Grid item xs={6}>
              <EditButton userUsername={row.username} />
            </Grid>
            <Grid item xs={6}>
              <DeleteUserButton
                userId={row.id}
                users={users}
                setUsers={setUsers}
              />
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      renderCell: ({ row }) => {
        return <Avatar src={row.avatar} />;
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Link component={RouterLink} to={`/user/${row.username}/profile`}>
            {row.username}
          </Link>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            value={row.role}
            disabled={row.role === "super-admin" ? true : false}
            label="Role"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem disabled value="super-admin">
              Super admin
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="moderator">Moderator</MenuItem>
            <MenuItem value="client"> Client</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            value={row.status}
            disabled={row.role === "super-admin" ? true : false}
            label="Status"
            onChange={({ target }) => onStatusUpdated(row.id, target.value)}
            sx={{ width: "100%" }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="banned"> Banned</MenuItem>
          </Select>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "firstName", headerName: "First name", width: 300 },
    { field: "lastName", headerName: "Last name", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 300 },
    { field: "updatedAt", headerName: "Updated At", width: 300 },
  ];

  const rows = users.map((user) => ({
    avatar: user.avatar ? `${avatarUrl}/${user.avatar}` : "",
    username: user.username,
    role: user.role,
    status: user.status,
    email: user.email,
    id: user._id,
    firstName: user.first_name,
    lastName: user.last_name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (data) {
        setUsers(data.usuarios);
      }
    }
    return () => {
      ignore = true;
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <Grid container height="30rem">
        <Typography>Is loading users...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container height="30rem">
      {updateIsLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          id="users-table"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      )}
    </Grid>
  );
};
