import React, { useState, useEffect } from "react";
import TicketService from "../services/ticketService";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiRefreshCw } from "react-icons/fi"

import EventBus from "../utils/EventBus";

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const UserTickets = () => {

  let navigate = useNavigate();

  const refresh = () => {
    TicketService.getTickets();
    navigate("/tickets");

  }

    const deleteTicket = React.useCallback(
        (id) => () => {
          setTimeout(() => {
            TicketService.deleteTicket(id)
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            navigate("/tickets");
          });
        },
        [navigate],
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'userId',
          headerName: 'User ID',
          width: 100
        },
        {
          field: 'subject',
          headerName: 'Subject',
          width: 250,
          editable: false,
        },
        {
          field: 'content',
          headerName: 'Content',
          width: 300,
          editable: false,
        },
        {
          field: 'createdAt',
          headerName: 'Created At',
          type: 'date',
          width: 150,
          editable: false,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            type: 'date',
            width: 150,
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
                onClick={deleteTicket(params.id)}
              />
            ]
        }
    ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    TicketService.getAllTickets().then(
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
      <h3 className="tab-title">All Tickets</h3>
    <DataGrid
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
