import { useState, useRef,useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Navbar from "../../Components/Navbar";
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavPanel from "../../Components/subcon-navpanel";
import ChunkFileUploader from "../../Components/ChunkFileUploader.jsx";
import '../../index.css';
import { Box, IconButton, Modal, Stack, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from "axios";

const SubcontractorDashboard = () => {
    
  const MAX_IMAGE_COUNT = 5;
  const MAX_VIDEO_COUNT = 1;
  const [error,setError] = useState(null);
  
  const [selectVideo, setSelectedVideo] = useState(null);

    //this variable is for clicking the images in post
  const [activeGallery, setActiveGallery] = useState(null); // { images: [], index: 0 }

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutUsText, setAboutUsText] = useState("Hi! We are passionate about bringing delicious food and memorable dining experience to your special events...");

  const [open, setOpen] = useState(false);
  const [editMediaOpen, setEditMediaOpen] = useState(false);


  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImageLenght, setSelectedImageLenght] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imageUrl, setImageUrl] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      setError(null);
      setSelectedImage([]);
  }

  const theme = useTheme();
  const dropRef = useRef(null);

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== indexToRemove));
    setError(null);
  };

  useEffect(() => {
      console.log("item data",itemData)
      console.log("selected image",selectedImage)
  },[selectedImage,itemData])

    const resizeImage = (file, maxWidth = 1920, maxHeight = 1080, sizeLimitMB = 10, quality = 0.8) => {
        return new Promise((resolve) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const reader = new FileReader();

            reader.onload = (e) => {
                img.onload = () => {
                    const originalWidth = img.width;
                    const originalHeight = img.height;
                    const originalSizeKB = file.size / 1024;
                    const originalSizeMB = originalSizeKB / 1024; // Convert size to MB

                    // Check if compression is needed based on size
                    if (originalSizeMB <= sizeLimitMB) {
                        // If file is smaller than or equal to the size limit, no compression needed
                        resolve({
                            resizedFile: file,
                            original: {
                                width: originalWidth,
                                height: originalHeight,
                                sizeKB: originalSizeKB,
                                sizeMB: originalSizeMB,
                            },
                            resized: {
                                width: originalWidth,
                                height: originalHeight,
                                sizeKB: originalSizeKB,
                                sizeMB: originalSizeMB,
                            },
                        });
                        return;
                    }

                    // Calculate scaled dimensions (only if resizing is needed)
                    const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
                    const newWidth = Math.round(originalWidth * ratio);
                    const newHeight = Math.round(originalHeight * ratio);

                    // Resize using canvas
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Compress the image with quality control only if it's larger than the size limit
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        const resizedSizeKB = resizedFile.size / 1024;
                        const resizedSizeMB = resizedSizeKB / 1024;

                        resolve({
                            resizedFile,
                            original: {
                                width: originalWidth,
                                height: originalHeight,
                                sizeKB: originalSizeKB,
                                sizeMB: originalSizeMB,
                            },
                            resized: {
                                width: newWidth,
                                height: newHeight,
                                sizeKB: resizedSizeKB,
                                sizeMB: resizedSizeMB,
                            },
                        });
                    }, file.type, quality); // Apply compression if the file is large
                };

                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        if (!selectVideo) {
            console.log("submitting image");
            const resizedImages = await Promise.all(
                selectedImage.map(async (img) => {
                    const {resizedFile, original, resized} = await resizeImage(img.file);

                    // console.log(`Image: ${img.title}`);
                    // console.log(`Original: ${original.width}x${original.height}, ${original.sizeKB.toFixed(2)} KB`);
                    // console.log(`Resized:  ${resized.width}x${resized.height}, ${resized.sizeKB.toFixed(2)} KB`);

                    return {
                        image: URL.createObjectURL(resizedFile),
                        title: resizedFile.name,
                        file: resizedFile,
                        meta: {original, resized}, // optional: keep for later display or debug
                    };
                })
            );
            console.log(resizedImages);
            let urlImages = [];
            for (const img of resizedImages) {
                try {
                    // API call to get a presigned URL
                    const presignedResponse = await axios.get(
                      `http://localhost:8080/showcasemedia/generate-PresignedUrl`,
                      {
                        params: {
                          file_name: img.file.name,
                          user_name: "johndoe"
                        },
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                      }
                    );

                    console.log(presignedResponse.data);
                    const presignedUrl = presignedResponse.data.presignedURL;
                    const baseUrl = presignedUrl.split('?')[0];

                    urlImages.push(baseUrl);
                    // Upload the file to the presigned URL
                    const uploadResponse = await axios.put(presignedUrl, img.file, {
                        headers: {
                            'Content-Type': img.file.type,
                        },
                    });
                    console.log(`Successfully uploaded: ${img.title}`);

                } catch (error) {
                    console.error(`Error uploading ${img.title}:`, error);
                }
            }

            console.log("urlImages",urlImages);



            // if(imageUrl.length != 0){
            //     axios.post('http://localhost:8080/subcontractor/upload-images', {},{
            //         headers: {
            //             Authorization: `Bearer ${localStorage.getItem('token')}`
            //         }
            //     })
            // }


            //call the endpoint and ask for presignedURL to POST in S3, then use the URL to save it in DB
            // axios.get()
            //     .then()
            //     .catch()

            // const newItem = {
            //     title,
            //     description,
            //     selectedImage: resizedImages.map((img) => ({
            //         image: img.image,
            //         title: img.title,
            //         // meta: img.meta  <-- optional for UI feedback
            //     })),
            // };
        }else{
            console.log("submitting video");

            //call the chunkUploader then return the video url then save to db
        }

        // setItemData((prev) => [...prev, newItem]);
        // setTitle('');
        // setDescription('');
        // setSelectedImage([]);
        handleClose();
    };

    const handleVideoChange = (event) => {
        setSelectedVideo(event.target.files[0]);
    }

    useEffect(()=>{
        console.log(imageUrl);
    },[imageUrl])

    const handleImageChange = (event) => {

        setSelectedImageLenght(event.target.files.length);
        
        if(event.target.files.length + selectedImageLenght > MAX_IMAGE_COUNT){
            setError("Only 5 images can be uploaded")
        }

        const files = Array.from(event.target.files);
        const imagesOnly = files.filter(file => file.type.startsWith('image/'));

        const remainingSlots = MAX_IMAGE_COUNT - selectedImage.length;
        const acceptedImages = imagesOnly.slice(0, remainingSlots);
        const imageArray = acceptedImages.map((file) => ({
            title: file.name,
            image: URL.createObjectURL(file),
            file,
        }));

        setSelectedImage((prev) => [...prev, ...imageArray]);
        event.target.value = null;
    }



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%',
      sm: '70%',
      md: '50%',
      lg: '40%',
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      <div className="grid lg:grid-cols-[1fr_3fr]">
        <div className="shadow hidden lg:block p-5">
          <NavPanel />
        </div>
        <div className="flex flex-col direct rounded-lg gap-4 bg-gray-100 md:px-10 md:py-10">
          <div className="flex items-center bg-white p-5 md:p-10 shadow-lg">
            <img
              src="https://s3-alpha-sig.figma.com/img/77cd/766b/225481949bb96c1ee92e2969c13f92f6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MgA~u1aSsMJWwuIpk-E5xBEOi8XPMninH2z6y2KAx~Azfo37d6ks4SqAolAPot7xsHEQShMTQvRSvv2ClxROmBPnuFzb4JiO7J3woNLPb897H5ndYRF-DWZM8Sa0VAJ6JXOYGEW~T9MVAM0ekDuikPDxbYMydG2BNtvD9lJozuraR2NtjgqszlfemHOanssPqdWEKzriBQjI0JGLu8ULQat5G6sXUQ-wlgwFUOk9L2Cs0ACDND5UVeaOAfrTT8Jh~n6hK9XQ~guO6IMNo47QZ-aR8g-7dP0uSWZmkm7WAsrhh3BYw0LzMYlTzkrGNyWjFd31cLCysbnYIrGUQ9FcMQ__"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="ml-4">
              <                h2 className="text-lg font-semibold">James Wilson</h2>
              <p className="text-gray-500">Subcontractor</p>
            </div>
          </div>

          {/* Showcase Section */}
          <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 lg:p-15 gap-4">
            <div className="flex flex-row w-full justify-between items-center md:p-4">
              <h1 className="md:text-xl font-poppins">Showcase</h1>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center">
                  <button
                    className="rounded-xl font-poppins text-white bg-blue-500 md:text-lg px-4 py-1 hover:bg-blue-600 transition duration-200"
                    onClick={handleOpen}
                  >
                    Add showcase
                  </button>
                </div>
                <div className="block sm:hidden">
                  <AddIcon
                    className="bg-blue-500 text-white rounded-xl p-2"
                    sx={{ fontSize: 40 }}
                    onClick={handleOpen}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="md:p-4">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="medium" className="font-poppins md:text-lg">
                  About us
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsEditingAbout((prev) => !prev)}
                  sx={{ color: 'gray' }}
                >
                  <EditIcon sx={{ color: 'grey-600' }} />
                </IconButton>
              </Box>

              {!isEditingAbout ? (
                <Typography className="font-poppins md:text-md text-gray-600 whitespace-pre-line">
                  {aboutUsText}
                </Typography>
              ) : (
                <Box mt={2}>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    value={aboutUsText}
                    onChange={(e) => setAboutUsText(e.target.value)}
                  />
                  <Box display="flex" justifyContent="flex-end" mt={1}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setIsEditingAbout(false)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </div>

            <Divider />
            {/* Showcase Items */}
            {itemData.map((item, index) => (
              <div key={index} className="py-6">
                {/* Title + Ellipsis */}
                <Box display="flex" justifyContent="space-between" alignItems="start">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="font-poppins text-lg text-slate-800"
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        const menu = document.getElementById(`menu-${index}`);
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                      }}
                    >
                      <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>
                        &#8942;
                      </Typography>
                    </IconButton>
                    <Box
                      id={`menu-${index}`}
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        right: 0,
                        zIndex: 10,
                        mt: 1,
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: 1,
                        boxShadow: 3,
                        minWidth: 120,
                      }}
                    >
                      <Button
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: 'black' }}
                        startIcon={<EditIcon />}
                        onClick={() => alert(`Edit: ${item.title}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: 'black' }}
                        startIcon={<CloseIcon />}
                        onClick={() =>
                          setItemData((prev) => prev.filter((_, i) => i !== index))
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {/* Description */}
                <Typography className="font-poppins text-gray-700 mt-2 mb-3 whitespace-pre-line">
                  {item.description}
                </Typography>

                {/* Image Rendering Logic */}
                {item.selectedImage.length > 0 && (
                  <Box>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                      {item.selectedImage.slice(0, 3).map((img, imgIndex) => (
                        <Box
                          key={imgIndex}
                          position="relative"
                          onClick={() =>
                            setActiveGallery({ images: item.selectedImage, index: imgIndex })
                          }
                          sx={{ cursor: 'pointer' }}
                        >
                          <img
                            src={img.image}
                            alt={img.title}
                            loading="lazy"
                            className="rounded-lg w-full h-[150px] object-cover"
                          />
                          {imgIndex === 2 && item.selectedImage.length > 3 && (
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              bgcolor="rgba(0, 0, 0, 0.5)"
                              borderRadius="8px"
                            >
                              <Typography variant="h6" color="white" fontWeight="bold">
                                +{item.selectedImage.length - 3} more
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                {/* Divider after each post */}
                <Divider sx={{ mt: 4 }} />
              </div>
))}

          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={600}>Add Showcase</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form Fields */}
            <Stack spacing={2}>
                <Box>
                    <Typography fontWeight={600} fontSize="0.875rem" color="#4A4A4A" mb={0.5}>Title</Typography>
                    <TextField
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box>
                    <Typography fontWeight={600} fontSize="0.875rem" color="#4A4A4A" mb={0.5}>Description</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>

                {/* Upload Section */}
                {error ? (
                    <Typography color="error" fontSize="0.9rem" mb={1}>
                        {error}
                    </Typography>
                ) : selectVideo ? (
                    <Box
                        sx={{
                            position: 'relative',
                            border: '2px solid #ccc',
                            borderRadius: '12px',
                            padding: '32px',
                            textAlign: 'center',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <video
                            controls
                            src={URL.createObjectURL(selectVideo)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '12px',
                            }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => setSelectedVideo(null)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: '#fff',
                                boxShadow: 1,
                            }}
                        >
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                ) : (
                    <Box
                        ref={dropRef}
                        onClick={() => document.getElementById('upload-image-button')?.click()}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '12px',
                            padding: '32px',
                            textAlign: 'center',
                            backgroundColor: '#fafafa',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <CloudUploadIcon sx={{color: '#90a4ae', fontSize: 40}}/>
                        <Typography mt={1} fontSize="0.9rem">
                            <span style={{color: '#1976d2', cursor: 'pointer', textDecoration: 'underline'}}>
                                Click here
                            </span>{' '}
                            to Upload Images
                        </Typography>
                        <input
                            accept="image/*"
                            type="file"
                            multiple
                            onChange={(event) => {
                                handleImageChange(event);
                            }}
                            style={{display: 'none'}}
                            id="upload-image-button"
                        />
                    </Box>
                )}

            {/* Preview Section */}
            {selectedImage.length > 0 && (
              <ImageList cols={3} gap={8}>
                {selectedImage.slice(0, 3).map((item, index) => (
                  <ImageListItem key={index} sx={{ position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        borderRadius: '12px',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: '#fff',
                        boxShadow: 1,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ImageListItem>
                ))}
                {selectedImage.length > 3 && (
                  <ImageListItem
                    onClick={() => setEditMediaOpen(true)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography fontWeight="bold" color="primary">
                      +{selectedImage.length - 3} more
                    </Typography>
                  </ImageListItem>
                )}
              </ImageList>
            )}

                {/* Actions */}
                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        variant="contained"
                        component="label" // Added component label for proper usage
                        disabled={selectedImage.length !== 0}
                    >
                        Add Video
                        <input
                            accept="video/*" // Fixed to accept video files instead of images
                            type="file"
                            onChange={(event) => handleVideoChange(event)} // Ensure handleVideoChange method exists and handles video files appropriately
                            style={{display: 'none'}}
                            id="upload-video-button" // Updated ID for better clarity and avoid conflict
                        />
                    </Button>
                    <Button variant="outlined"
                            onClick={() => setEditMediaOpen(true)}
                            disabled={selectedImage.length === 0}
                    >
                        Edit All
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!title || !description || (selectedImageLenght === 0 && selectVideo == null)}
                    >
                        Add
                    </Button>
                </Box>
          </Stack>
        </Box>
      </Modal>


      {/* Fullscreen Edit Modal */}
      <Modal open={editMediaOpen} onClose={() => setEditMediaOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" mb={2}>Edit Uploaded Media</Typography>

          <ImageList cols={3} gap={16}>
            {selectedImage.map((item, index) => (
              <ImageListItem
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 220,
                  backgroundColor: '#f5f5f5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                    zIndex: 10,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>

          <Box mt={4} display="flex" justifyContent="space-between">
            <label htmlFor="edit-upload-image-button">
              <Button variant="outlined" component="span">Add More Images</Button>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="edit-upload-image-button"
              />
            </label>
            <Button variant="contained" onClick={() => setEditMediaOpen(false)}>Done</Button>
          </Box>
        </Box>
      </Modal>
      {/* Fullscreen Viewer */}
              {/* Fullscreen Viewer Modal */}
<Modal
  open={!!activeGallery}
  onClose={() => setActiveGallery(null)}
  sx={{
    backdropFilter: 'blur(6px)', // 🔵 BLUR BACKGROUND
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim + blur
    zIndex: 1300,
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '900px',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {activeGallery && (
      <>
        <img
          src={activeGallery.images[activeGallery.index].image}
          alt="Preview"
          style={{
            maxHeight: '70vh',
            maxWidth: '100%',
            borderRadius: '12px',
            objectFit: 'contain',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={2}
          px={2}
        >
          <Button
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            color: 'white'
          }}
            variant="outlined"
            color="inherit"
            onClick={() =>
              setActiveGallery((prev) => ({
                ...prev,
                index:
                  prev.index === 0
                    ? prev.images.length - 1
                    : prev.index - 1,
              }))
            }
          >
            Prev
          </Button>
          <Typography color="white">
            {activeGallery.index + 1} / {activeGallery.images.length}
          </Typography>
          <Button
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            color: 'white'
          }}
            variant="outlined"
            color="inherit"
            onClick={() =>
              setActiveGallery((prev) => ({
                ...prev,
                index:
                  prev.index === prev.images.length - 1
                    ? 0
                    : prev.index + 1,
              }))
            }
          >
            Next
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>

    </div>
  );
};

export default SubcontractorDashboard;
