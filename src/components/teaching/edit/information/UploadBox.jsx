import * as React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';

function UploadBox({ imageUrl, onImageChange }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(imageUrl);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleUploadClick = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      onImageChange(newFile);
    }
  };

  return (
    <Card
      variant='outlined'
      sx={{ width: 200, height: 200, position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardActionArea
        component='label'
        sx={{ height: '100%', position: 'relative' }}
      >
        <input
          type='file'
          hidden
          onChange={handleUploadClick}
          accept='image/png, image/jpeg' // file types
        />
        {preview ? (
          <Avatar
            alt='Uploaded image'
            src={preview}
            sx={{ width: 200, height: 200, borderRadius: 1 }}
          />
        ) : (
          <CardContent sx={{ textAlign: 'center', paddingTop: 4 }}>
            <CloudUploadIcon color='action' sx={{ fontSize: 40 }} />
            <Typography gutterBottom variant='h5' component='div'>
              Logo
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              Upload a logo for your course
            </Typography>
          </CardContent>
        )}
        {hover && preview && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 40 }} />
            <Typography>Change</Typography>
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
}

export default UploadBox;
