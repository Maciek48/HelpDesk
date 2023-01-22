import React, { useState, useEffect } from "react";
import ArticleService from "../services/articleService";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiExternalLink } from "react-icons/fi"

import EventBus from "../utils/EventBus";

import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const UserArticles = () => {

  let navigate = useNavigate();

  const navigateToArticleDetails = React.useCallback(
    (id) => () => {
      navigate(`/articles/${id}`);
    }, [navigate],
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'headline', headerName: 'Headline', width: 350, editable: false },
    { field: 'content', headerName: 'Content', width: 400, editable: false, },
    { field: 'createdAt', headerName: 'Created At', type: 'date', width: 150, editable: false, },
    {
      field: 'actions', type: 'actions', headerName: 'Details', width: 80, getActions: (params) => [
        <GridActionsCellItem
          label="Details"
          icon={<FiExternalLink />}
          onClick={navigateToArticleDetails(params.id)}
        />
      ]
    }
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    ArticleService.getAllArticles().then(
      (response) => {
        const data = response.data.map((row, index) => ({...row, id: row.id}))
        setRows(data);
        /*setRows(response.data);*/
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
    <Box>
      <h3 className="tab-title">Tickets</h3>
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

export default UserArticles;
