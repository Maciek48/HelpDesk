import React, { useState, useEffect } from "react";
import UserService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi"

import EventBus from "../utils/EventBus";

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const UserTickets = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();

    const deleteUser = React.useCallback(
        (id) => () => {
          setTimeout(() => {
            UserService.deleteUser(id)
            if(id == user.id) {
              EventBus.dispatch("logout");
              window.location.reload();
            }
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            navigate("/users");
          });
        },
        [navigate],
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: false,
        },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 150,
          editable: false,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
          editable: false,
        },
        {
          field: 'createdAt',
          headerName: 'Created At',
          type: 'string',
          width: 200,
          editable: false,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            type: 'string',
            width: 200,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Delete',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<FiTrash2 />}
                label="Delete"
                onClick={deleteUser(params.id)}
              />
            ]
        }
    ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setRows(response.data);
      },
      (error) => {
        const _rows =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRows(_rows);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <Box sx={{ height: '95%', width: '100%' }}>
      <h3 className="tab-title">Users</h3>
    <DataGrid
      className="tabs"
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      disableSelectionOnClick
    />
    </Box>
  );
};

export default UserTickets;
